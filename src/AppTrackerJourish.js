import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import './components/app-description';
import './components/country-list-connected';
import './components/utility-banner';
import './components/worldwide-banner';

import darkThemeStyles from './styles/dark-theme-styles';
import flexboxStyles from './styles/flexbox-styles';
import fontStyles from './styles/font-styles';

export default class AppTrackerJourish extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      fontStyles,
      css`
        main {
          margin: auto;
          max-width: 1000px;
          padding: 72px 24px;
        }
        @media screen and (max-width: 600px) {
          main {
            padding-bottom: 0;
          }
        }
        .content {
          margin: 24px 0;
        }
        .content:last-child {
          margin-bottom: 0;
        }
        .world-banner {
          margin-bottom: 8px;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      error: { type: String },
      isMobile: { type: Boolean },
      query: { type: String },
      sortBy: { type: Object },
      worldwide: { type: Object },
    };
  }

  constructor() {
    super();

    this.error = '';
    this.isMobile = window.innerWidth < 600;
    this.query = '';
    this.sortBy = {
      count: 'cases-desc',
      coverage: 'country',
    };
    this.worldwide = {};
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', () => AppTrackerJourish.handleResize(this));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', () => AppTrackerJourish.handleResize(this));
    super.disconnectedCallback();
  }

  render() {
    const appTitle = html`<h1 class="primary-text">COVID-19 Tracker</h1>`;

    if (this.error !== '') {
      return html`
        <main>
          ${appTitle}
          <p class="primary-text">${this.error}</p>
        </main>
      `;
    }

    return html`
      <main>
        <div class="content">
          ${appTitle}
        </div>

        <div class="content">
          <app-description></app-description>
        </div>

        <div class="content world-banner">
          ${this.renderWorldwideBanner()}
        </div>

        ${this.renderUtilityBanner('top')}

        <div class="content">
          <country-list-connected
            ?isMobile="${this.isMobile}"
            @handle-error="${this.handleError}"
            @handle-fetching="${this.handleFetching}"
            @handle-worldwide-update="${this.handleWorldwideUpdate}"
            count="${this.sortBy.count}"
            coverage="${this.sortBy.coverage}"
            query="${this.query}"
          ></country-list-connected>
        </div>
      </main>

      ${this.renderUtilityBanner('bottom')}
    `;
  }

  renderWorldwideBanner() {
    if (Object.keys(this.worldwide).length > 0) {
      return html`
        <worldwide-banner
          ?isMobile="${this.isMobile}"
          cases="${this.worldwide.cases.total}"
          deaths="${this.worldwide.deaths.total}"
          newCases="${this.worldwide.cases.new}"
          newDeaths="${this.worldwide.deaths.new}"
          recovered="${this.worldwide.cases.recovered}"
          time="${this.worldwide.time}"
        ></worldwide-banner>
      `;
    }

    return nothing;
  }

  renderUtilityBanner(location) {
    if (Object.keys(this.worldwide).length > 0) {
      return html`
        <utility-banner
          ?isMobile="${this.isMobile}"
          @handle-search-query="${this.handleSearchQuery}"
          @handle-sort-by="${this.handleSortBy}"
          count="${this.sortBy.count}"
          coverage="${this.sortBy.coverage}"
          location="${location}"
        ></utility-banner>
      `;
    }

    return nothing;
  }

  static handleResize(context) {
    // eslint-disable-next-line no-param-reassign
    context.isMobile = window.innerWidth < 600;
  }

  async fetchCountries() {
    this.countries = [];
  }

  handleSearchQuery({ detail }) {
    const { query } = detail;
    this.query = query;
  }

  handleSortBy({ detail }) {
    const { type, sortBy } = detail;
    const updatedSortBy = { ...this.sortBy };
    updatedSortBy[type] = sortBy;
    this.sortBy = updatedSortBy;
  }

  handleWorldwideUpdate({ detail }) {
    const { worldwide } = detail;
    this.worldwide = worldwide;
  }

  handleError({ detail }) {
    const { error } = detail;
    this.error = error;
  }
}
