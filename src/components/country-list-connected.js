import CountryList from './country-list';

import formatCountryName from '../utils/formatCountryName';

import continents from '../constants/continents';

import {
  apiHost,
  apiKey,
  apiUrl,
  apiPassphrase,
} from '../constants/api';

export default class CountryListConnected extends CountryList {
  async fetchCountries() {
    const host = apiHost || process.env.API_HOST;
    const key = apiKey || process.env.API_KEY;
    const url = apiUrl || process.env.API_URL;

    const simpleCrypto = new SimpleCrypto(apiPassphrase || process.env.API_PASSPHRASE);
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
      this.countries = toJSON.response;
      this.extractData();
    } catch (e) {
      this.dispatchEvent(
        new CustomEvent('handle-error', {
          detail: {
            error: `
              Failed to load 😞
              ${e.status}: ${e.statusText}
            `,
          },
        }),
      );
    } finally {
      this.dispatchEvent(
        new CustomEvent('update-is-fetching', {
          detail: {
            isLoading: false,
          },
        }),
      );

      // this.getUserPreference();
    }
  }

  extractData() {
    const data = [...this.countries];
    const extractedCountries = [];
    const extractedContinents = new Map();
    const countryCount = new Map();

    data.forEach((item) => {
      const formattedCountryName = formatCountryName(item.country);
      const formattedContinent = formatCountryName((item.continent) || 'no continent');
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
        const newItem = { ...item };

        // to correct the south korea name. it only displays 's korea'
        if (formattedCountryName.includes('korea')) {
          newItem.country = 'South Korea';
        }

        countryCount.set(formattedContinent, (countryCount.get(formattedContinent) || 0) + 1);
        extractedCountries.push(newItem);
      }
    });

    extractedContinents.forEach((value, key) => {
      const count = key === 'worldwide' ? extractedCountries.length : countryCount.get(key);

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
      }),
    );
  }

  // upcoming feature: country pinning
  // async getUserPreference() {
  //   const userPref = localStorage.getItem('preference');

  //   if (userPref) {
  //     this.preference = [...this.preference, ...userPref.split(',')];
  //     return;
  //   }

  //   try {
  //     const response = await fetch('https://freegeoip.app/json/', {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         'content-type': 'application/json',
  //       },
  //     });

  //     if (response.status !== 200) throw response;

  //     const toJSON = await response.json();
  //     const country = toJSON.country_name.toLowerCase();

  //     localStorage.setItem('preference', country);
  //     this.preference = [...this.preference, country];
  //   } catch (e) {
  //     // this.dispatchEvent(
  //     //   new CustomEvent('handle-error', {
  //     //     detail: {
  //     //       error: `
  //     //         Failed to load 😞
  //     //         ${e.status}: ${e.statusText}
  //     //       `,
  //     //     },
  //     //   }),
  //     // );
  //   } finally {
  //     // this.dispatchEvent(
  //     //   new CustomEvent('update-is-fetching', {
  //     //     detail: {
  //     //       isLoading: false,
  //     //     },
  //     //   }),
  //     // );
  //   }
  // }
}

customElements.define('country-list-connected', CountryListConnected);
