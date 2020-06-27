import CountryList from './country-list';

import formatCountryName from '../utils/formatCountryName';

import continents from '../constants/continents';

import { apiHost, apiKey, apiUrl } from '../constants/api';

export default class CountryListConnected extends CountryList {
  async fetchCountries() {
    const host = apiHost || process.env.API_HOST;
    const key = apiKey || process.env.API_KEY;
    const url = apiUrl || process.env.API_URL;

    this.updateIsFetching(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': host,
          'x-rapidapi-key': key,
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
      this.updateIsFetching(false);
    }
  }

  updateIsFetching(isFetching) {
    this.dispatchEvent(
      new CustomEvent('handle-fetching', {
        detail: {
          isFetching,
        },
      }),
    );
  }

  extractData() {
    const data = [...this.countries];

    const extractedCountries = [];
    const extractedContinents = [];
    let extractedWorldwide = {};

    data.forEach((item) => {
      const formattedCountryName = formatCountryName(item.country);

      if (continents.includes(formattedCountryName)) {
        extractedContinents.push(item);

        // https://www.quora.com/Which-continent-is-called-both-a-continent-and-a-country
        if (formattedCountryName === 'australia') {
          extractedCountries.push(item);
        }
      } else if (formattedCountryName === 'all') {
        extractedWorldwide = { ...item };
      } else {
        const newItem = { ...item };

        // to correct the south korea name. it only displays 's korea'
        if (formattedCountryName.includes('korea')) {
          newItem.country = 'South Korea';
        }

        extractedCountries.push(newItem);
      }
    });

    this.continents = [...extractedContinents];
    this.countries = [...extractedCountries];

    this.dispatchEvent(
      new CustomEvent('handle-worldwide-update', {
        detail: {
          worldwide: { ...extractedWorldwide },
        },
      }),
    );
  }
}

customElements.define('country-list-connected', CountryListConnected);
