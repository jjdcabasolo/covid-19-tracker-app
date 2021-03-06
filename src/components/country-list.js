import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import '@appnest/masonry-layout/masonry-layout';
import './card/country-card';
import './skeleton-loaders/country-card-skeleton';
import './scroll-to-top-button';

import { formatCountryName } from '../utils/country';

import fontStyles from '../styles/font-styles';

export default class CountryList extends LitElement {
  static get styles() {
    return [
      css`
        .country-card-item {
          display: flex;
          justify-content: center;
        }
        .loader {
          width: 100%;
        }
        #scrollToTopSentinel {
          position: absolute;
          bottom: 0;
        }
        @media screen and (max-width: 600px) {
          p {
            height: 20vh;
          }
          .mobile-spacer {
            width: 100%;
            height: 40vh;
          }
        }
      `,
      fontStyles,
    ];
  }

  static get properties() {
    return {
      countries: { type: Array },
      filter: { type: String },
      hasScrollToTop: { type: Boolean },
      isMobile: { type: Boolean },
      loadedItems: { type: Number },
      preference: { type: Array },
      query: { type: String },
      sort: { type: String },
    };
  }

  constructor() {
    super();

    this.countries = [];
    this.filter = '';
    this.hasScrollToTop = false;
    this.isMobile = false;
    this.loadedItems = 10;
    this.preference = [];
    this.query = '';
    this.sort = '';
  }

  connectedCallback() {
    super.connectedCallback();

    this.fetchCountries();
  }

  updated() {
    const loadMoreSentinel = this.shadowRoot.getElementById('loadMoreSentinel');

    if (loadMoreSentinel) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            setTimeout(() => {
              this.loadedItems += 20;
            }, 500);
          }
        });
      });

      observer.observe(loadMoreSentinel);
    }

    const scrollToTopSentinel = this.shadowRoot.getElementById(
      'scrollToTopSentinel'
    );

    if (scrollToTopSentinel) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            this.hasScrollToTop = false;
          } else {
            this.hasScrollToTop = true;
          }
        });
      });

      observer.observe(scrollToTopSentinel);
    }
  }

  render() {
    const filteredItems = this.filterSearchQuery();
    return html`
      <masonry-layout gap="14" maxcolwidth="${this.isMobile ? 390 : 310}">
        ${this.renderCountryList(filteredItems)}
      </masonry-layout>
      <div id="scrollToTopSentinel"></div>
      <scroll-to-top-button
        ?isVisible="${this.hasScrollToTop}"
      ></scroll-to-top-button>
      ${filteredItems.length < 3
        ? html`<div class="mobile-spacer"></div>`
        : nothing}
    `;
  }

  renderCountryList(filteredItems) {
    if (filteredItems.length > 0) {
      const extraItems = this.isMobile ? 0 : 3;
      const itemAdjustment =
        filteredItems.length > this.loadedItems ? extraItems : 0;

      return filteredItems
        .slice(0, this.loadedItems + itemAdjustment)
        .map((e, i) => {
          if (i === this.loadedItems - 1) {
            return html`
              <div class="loader" id="loadMoreSentinel">
                <country-card-skeleton></country-card-skeleton>
              </div>
            `;
          }

          if (i > this.loadedItems - 1) {
            return html` <country-card-skeleton></country-card-skeleton> `;
          }

          return html`
            <div class="country-card-item">
              <country-card
                .country=${e}
                ?isPinned=${this.preference.includes(e.code)}
                @set-pin=${this.setPin}
                filter=${this.filter}
                sort=${this.sort}
              ></country-card>
            </div>
          `;
        });
    }

    if (this.countries.length < 1) {
      return Array(this.loadedItems)
        .fill('')
        .map(() => html` <country-card-skeleton></country-card-skeleton> `);
    }

    if (this.query.trim().length > 0) {
      return html`<p class="primary-text">No results 😞</p>`;
    }

    return nothing;
  }

  async fetchCountries() {
    this.countries = [];
  }

  filterSearchQuery() {
    const filteredItems = this.countries
      // coverage filtering
      .filter(e => {
        if (this.filter === 'worldwide') return e;

        if (!e.continent) return null;

        const trimmedContinent = formatCountryName(e.continent);

        return trimmedContinent === this.filter;
      })
      // case count sorting
      .sort((a, b) => {
        const [key, mode] = this.sort.split('-');
        const isAsc = mode === 'asc';

        let current = '';
        let next = '';

        switch (key) {
          case 'cases':
            current = a.cases.total;
            next = b.cases.total;
            break;
          case 'deaths':
            current = a.deaths.total;
            next = b.deaths.total;
            break;
          case 'recoveries':
            current = a.cases.recovered;
            next = b.cases.recovered;
            break;
          case 'tests':
            current = a.population > 0 ? a.tests.total / a.population : 0;
            next = b.population > 0 ? b.tests.total / b.population : 0;
            break;
          default:
            break;
        }

        if (isAsc) return current - next;
        return next - current;
      })
      // rank inclusion
      .map((e, i) => ({
        ...e,
        position: i,
      }))
      // search filtering
      .filter(e => {
        const trimmedCountry = formatCountryName(e.country);
        const trimmedQuery = formatCountryName(this.query);

        return trimmedCountry.indexOf(trimmedQuery) === 0;
      });

    if (this.preference.length > 0) {
      let pinnedCountries = [];
      let updatedFilteredItems = [...filteredItems];
      // country pinning - pin to top
      updatedFilteredItems = updatedFilteredItems.reduce((acc, cur) => {
        if (this.preference.includes(cur.code)) {
          pinnedCountries = [...pinnedCountries, cur];
          return acc;
        }

        return acc.concat(cur);
      }, []);

      return [...pinnedCountries, ...updatedFilteredItems];
    }

    return filteredItems;
  }

  setPin({ detail }) {
    const { code } = detail;

    if (this.preference.includes(code)) {
      this.preference = this.preference.filter(e => e !== code);
    } else {
      this.preference = [...this.preference, code];
    }
    localStorage.setItem('preference', this.preference);
    this.requestUpdate();
  }
}
