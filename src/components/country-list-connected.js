import CountryList from './country-list';

import { formatCountryName, getCountryCode } from '../utils/country';

import continents from '../constants/continents';

import { apiHost, apiKey, apiUrl, apiPassphrase } from '../constants/api';

export default class CountryListConnected extends CountryList {
  async fetchCountries() {
    const host = apiHost || process.env.API_HOST;
    const key = apiKey || process.env.API_KEY;
    const url = apiUrl || process.env.API_URL;

    // eslint-disable-next-line no-undef
    const simpleCrypto = new SimpleCrypto(
      apiPassphrase || process.env.API_PASSPHRASE
    );
    const decryptedKey = simpleCrypto.decrypt(key);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': host,
          'x-rapidapi-key': decryptedKey,
        },
      });
      if (response.status !== 200) throw response;
      const toJSON = await response.json();
      localStorage.setItem('cachedData', JSON.stringify(toJSON.response));
      this.extractData(toJSON.response);
    } catch (e) {
      this.handleFetchingError(e);
    } finally {
      this.dispatchEvent(
        new CustomEvent('update-is-fetching', {
          detail: {
            isLoading: false,
          },
        })
      );

      this.getUserPreference();
    }
  }

  handleFetchingError(e) {
    const cachedData = localStorage.getItem('cachedData');

    if (cachedData) {
      this.extractData(JSON.parse(cachedData));
    } else if (window.navigator.onLine) {
      this.dispatchEvent(
        new CustomEvent('handle-error', {
          detail: {
            error: `
                Failed to fetch data from API provider 😞 Status ${e.status}: ${e.statusText}.
              `,
          },
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent('handle-error', {
          detail: {
            error:
              'No offline data saved. You must go online so the app can save the data for offline use.',
          },
        })
      );
    }
  }

  extractData(response) {
    const data = [...response];
    const extractedCountries = [];
    const extractedContinents = new Map();
    const countryCount = new Map();

    data.forEach(item => {
      const formattedCountryName = formatCountryName(item.country);
      const formattedContinent = formatCountryName(
        item.continent || 'no continent'
      );
      const displayName = formatCountryName(item.country, false);

      if (continents.includes(formattedCountryName)) {
        extractedContinents.set(formattedCountryName, {
          ...item,
          country: displayName,
          continent: displayName,
        });
      } else if (formattedCountryName === 'all') {
        extractedContinents.set('worldwide', {
          ...item,
          country: 'Worldwide',
          continent: 'Worldwide',
        });
      } else {
        const newItem = {
          ...item,
          code: getCountryCode(formattedCountryName),
        };

        // to correct the south korea name. it only displays 's korea'
        if (formattedCountryName.includes('korea')) {
          newItem.country = 'South Korea';
        }

        countryCount.set(
          formattedContinent,
          (countryCount.get(formattedContinent) || 0) + 1
        );
        extractedCountries.push(newItem);
      }
    });

    extractedContinents.forEach((value, key) => {
      const count =
        key === 'worldwide' ? extractedCountries.length : countryCount.get(key);

      extractedContinents.set(key, {
        ...value,
        countryCount: count,
      });
    });

    this.countries = [...extractedCountries];

    this.dispatchEvent(
      new CustomEvent('handle-coverage-update', {
        detail: {
          coverage: extractedContinents,
        },
      })
    );
  }

  async getUserPreference() {
    const userPref = localStorage.getItem('preference');

    if (userPref) {
      this.preference = [...this.preference, ...userPref.split(',')];
      return;
    }

    try {
      const response = await fetch('https://freegeoip.app/json/', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      });

      if (response.status !== 200) throw response;

      const toJSON = await response.json();
      const country = toJSON.country_name.toLowerCase();
      const code = getCountryCode(country);

      localStorage.setItem('preference', code);
      this.preference = [...this.preference, code];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
}

customElements.define('country-list-connected', CountryListConnected);
