import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import '@appnest/masonry-layout/masonry-layout';
import './country-card';
import './skeleton-loaders/country-card-skeleton';
import './scroll-to-top-button';

import fontStyles from '../styles/font-styles';

export default class CountryList extends LitElement {
  static get styles() {
    return [
      css`
        .country-card-item {
          display: flex;
          justify-content: center;
        }
        .count {
          margin-bottom: 16px;
        }
        .loader {
          width: 100%;
        }

        #scrollToTopSentinel {
          position: absolute;
          bottom: 0;
        }
      `,
      fontStyles,
    ];
  }

  static get properties() {
    return {
      continents: { type: Array },
      count: { type: String },
      countries: { type: Array },
      coverage: { type: String },
      hasScrollToTop: { type: Boolean },
      isMobile: { type: Boolean },
      loadedItems: { type: Number },
      query: { type: String },
    };
  }

  constructor() {
    super();

    this.continents = [];
    this.count = '';
    this.countries = [];
    this.coverage = '';
    this.hasScrollToTop = false;
    this.isMobile = false;
    this.loadedItems = 10;
    this.query = '';
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
    return html`
      ${this.renderCountDetails()}
      <masonry-layout gap="16" maxcolwidth="${this.isMobile ? 390 : 310}">
        ${this.renderCountryList()}
      </masonry-layout>
      <div id="scrollToTopSentinel"></div>
      <scroll-to-top-button
        ?isVisible="${this.hasScrollToTop}"
        @handle-scroll-to-top="${this.handleScrollToTop}"
      ></scroll-to-top-button>
    `;
  }

  renderCountDetails() {
    if (this.countries.length <= 0) {
      return nothing;
    }

    let items = this.continents;
    let label = 'continents';

    if (this.coverage.includes('country')) {
      items = this.countries;
      label = 'countries';
    }

    return html`
      <div class="primary-text small-text count">
        ${items.length}
        <span class="secondary-text">${label} listed</span>
      </div>
    `;
  }

  renderCountryList() {
    const filteredItems = this.filterSearchQuery();

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
                activeFilter="${this.count}"
                cases="${e.cases.total}"
                country="${e.country.replace(/-/g, ' ')}"
                coverage="${this.coverage}"
                deaths="${e.deaths.total}"
                newCases="${e.cases.new}"
                newDeaths="${e.deaths.new}"
                rank="${e.position}"
                recovered="${e.cases.recovered}"
                time="${e.time}"
              ></country-card>
            </div>
          `;
        });
    }

    if (this.query.trim().length > 0) {
      return html`<p class="primary-text">No results 😞</p>`;
    }

    return html`<p class="primary-text">Loading...</p>`;
  }

  async fetchCountries() {
    this.countries = [];
  }

  filterSearchQuery() {
    const items = this.coverage.includes('country')
      ? this.countries
      : this.continents;
    const filteredItems = items
      .sort((a, b) => {
        const isAsc = this.count.includes('asc');
        let selectors = { first: 'cases', second: 'recovered' };

        if (this.count.includes('cases')) {
          selectors = { first: 'cases', second: 'total' };
        }
        if (this.count.includes('deaths')) {
          selectors = { first: 'deaths', second: 'total' };
        }

        if (isAsc) {
          return (
            a[selectors.first][selectors.second] -
            b[selectors.first][selectors.second]
          );
        }
        return (
          b[selectors.first][selectors.second] -
          a[selectors.first][selectors.second]
        );
      })
      .map((e, i) => ({
        ...e,
        position: i,
      }))
      .filter(e => {
        const trimmedCountry = e.country
          .replace(/-/g, ' ')
          .trim()
          .toLowerCase();
        const trimmedQuery = this.query.trim().toLowerCase();

        return trimmedCountry.includes(trimmedQuery);
      });

    return filteredItems;
  }

  handleScrollToTop({ detail }) {
    const { isVisible } = detail;
    this.hasScrollToTop = isVisible;
  }
}
