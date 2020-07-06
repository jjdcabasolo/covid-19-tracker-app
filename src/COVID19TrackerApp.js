import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import './components/app-description';
import './components/country-list-connected';
import './components/utility-panel';
import './components/worldwide-banner';

import darkThemeStyles from './styles/dark-theme-styles';
import flexboxStyles from './styles/flexbox-styles';
import fontStyles from './styles/font-styles';

const APP_TITLE = html`<h1 class="primary-text">COVID-19 Tracker</h1>`;
const MOBILE = 600;
const TABLET = 1000;

export default class COVID19TrackerApp extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      fontStyles,
      css`
        main {
          margin: auto;
          max-width: 1000px;
          padding: 72px 24px 0 24px;
        }
        h1 {
          margin: 0;
        }
        .content {
          margin: 16px 0;
        }
        .left-panel {
          flex-basis: 75%;
          flex-direction: column;
          flex-grow: 0;
          max-width: 75%;
        }
        .right-panel {
          flex-basis: 25%;
          flex-grow: 0;
          max-width: 25%;
          position: relative;
        }
        .right-panel-container {
          align-items: center;
          display: flex;
          height: 100vh;
          position: fixed;
          top: 0;
          width: 250px;
        }
        @media screen and (max-width: 600px) {
          main {
            padding-bottom: 0;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      config: { type: Object },
      coverage: { type: Map },
      error: { type: String },
      isTablet: { type: Boolean },
      isLoading: { type: Boolean },
      isMobile: { type: Boolean },
      query: { type: String },
      worldwide: { type: Object },
    };
  }

  constructor() {
    super();

    this.config = {
      countryCount: 0,
      filter: 'worldwide',
      sort: 'cases-desc',
    };
    this.coverage = new Map();
    this.error = '';
    this.isTablet = window.innerWidth < TABLET;
    this.isLoading = true;
    this.isMobile = window.innerWidth < MOBILE;
    this.query = '';
    this.worldwide = {};
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', () =>
      COVID19TrackerApp.handleResize(this)
    );
  }

  disconnectedCallback() {
    window.removeEventListener('resize', () =>
      COVID19TrackerApp.handleResize(this)
    );
    super.disconnectedCallback();
  }

  render() {
    if (this.error !== '') {
      return html`
        <main>
          ${APP_TITLE}
          <p class="primary-text">${this.error}</p>
        </main>
      `;
    }

    if (this.isTablet) {
      return html`
        <main>
          ${this.renderCountryList()}
        </main>
        ${this.renderUtilityBanner('bottom')}
      `;
    }

    return html`
      <main class="container">
        <div class="item left-panel">
          ${this.renderCountryList()}
        </div>
        <div class="item right-panel">
          <div class="right-panel-container">
            <utility-panel
              .worldwide=${this.coverage.get(this.config.filter)}
              ?isLoading=${this.isLoading}
              ?isMobile=${this.isMobile}
              @handle-search-query=${this.handleSearchQuery}
              @set-config=${this.setConfig}
              filter=${this.config.filter}
              sort=${this.config.sort}
            ></utility-panel>
          </div>
        </div>
      </main>
    `;
  }

  renderCountryList() {
    return html`
      <div class="content">
        ${APP_TITLE}
      </div>

      <div class="content">
        <app-description></app-description>
      </div>

      ${this.isTablet ? this.renderUtilityBanner('top') : null}

      <div class="content">
        ${this.renderWorldwideBanner()}
        <country-list-connected
          ?isMobile=${this.isMobile}
          @handle-coverage-update=${this.handleCoverageUpdate}
          @handle-error=${this.handleError}
          @update-is-fetching=${this.updateIsFetching}
          filter=${this.config.filter}
          query=${this.query}
          sort=${this.config.sort}
        ></country-list-connected>
      </div>
    `;
  }

  renderWorldwideBanner() {
    if (this.coverage.get(this.config.filter)) {
      return html`
        <worldwide-banner
          .coverage=${this.coverage.get(this.config.filter)}
          ?isMobile=${this.isMobile}
          activeFilter=${this.config.sort}
        ></worldwide-banner>
      `;
    }

    return nothing;
  }

  renderUtilityBanner(location) {
    if (location === 'top' && this.isMobile) return null;
    if (location === 'bottom' && !this.isMobile) return null;

    return html`
      <utility-panel
        .worldwide=${this.coverage.get(this.config.filter)}
        ?isLoading=${this.isLoading}
        ?isMobile=${this.isTablet}
        @handle-search-query=${this.handleSearchQuery}
        @set-config=${this.setConfig}
        filter=${this.config.filter}
        sort=${this.config.sort}
      ></utility-panel>
    `;
  }

  static handleResize(context) {
    // eslint-disable-next-line no-param-reassign
    context.isMobile = window.innerWidth < MOBILE;
    context.isTablet = window.innerWidth < TABLET;
  }

  handleSearchQuery({ detail }) {
    const { query } = detail;

    this.query = query;
  }

  setConfig({ detail }) {
    const { key, value } = detail;
    const updatedSortBy = { ...this.config };

    updatedSortBy[key] = value;
    this.config = updatedSortBy;
  }

  handleCoverageUpdate({ detail }) {
    const { coverage } = detail;

    this.coverage = coverage;
  }

  handleError({ detail }) {
    const { error } = detail;

    this.error = error;
  }

  updateIsFetching({ detail }) {
    const { isLoading } = detail;

    this.isLoading = isLoading;
  }
}
