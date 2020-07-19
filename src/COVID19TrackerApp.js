import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import './components/app-description';
import './components/card/worldwide-card';
import './components/country-list-connected';
import './components/skeleton-loaders/worldwide-card-skeleton';
import './components/tablet-drawer';
import './components/utility-panel';

import darkThemeStyles from './styles/dark-theme-styles';
import flexboxStyles from './styles/flexbox-styles';
import fontStyles from './styles/font-styles';

import trackerLogoSVG from './tracker-logo';

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
          margin: 8px 0;
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
        utility-panel {
          align-items: center;
          display: flex;
          height: 100vh;
          overflow-y: auto;
        }
        .logo {
          margin-right: 16px;
        }
        .logo svg {
          height: 3em;
          width: 3em;
        }
        @media screen and (max-height: 700px) and (orientation: landscape) {
          utility-panel {
            align-items: unset;
            display: unset;
          }
        }
        @media screen and (max-width: 600px) {
          .content {
            margin: 16px 0;
          }
          main {
            padding-bottom: 0;
          }
          utility-panel {
            align-items: unset;
            display: unset;
            height: unset;
            overflow-y: unset;
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
          ${this.renderAppTitle()}
          <p class="primary-text">${this.error}</p>
        </main>
      `;
    }

    if (this.isMobile) {
      return html`
        <main>
          ${this.renderCountryList()}
        </main>
        ${this.renderUtilityPanel()}
      `;
    }

    if (this.isTablet) {
      return html`
        <main>
          ${this.renderCountryList()}
        </main>
        <tablet-drawer>
          ${this.renderUtilityPanel()}
        </tablet-drawer>
      `;
    }

    return html`
      <main class="container">
        <div class="item left-panel">
          ${this.renderCountryList()}
        </div>
        <div class="item right-panel">
          <div class="right-panel-container">
            ${this.renderUtilityPanel()}
          </div>
        </div>
      </main>
    `;
  }

  renderCountryList() {
    let worldwide = this.renderWorldwideCard();
    if (this.isMobile && this.query.length > 0) {
      worldwide = nothing;
    }

    return html`
      <div class="content">
        ${this.renderAppTitle()}
      </div>

      <div class="content">
        <app-description></app-description>
      </div>

      <div class="content">
        ${worldwide}
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

  // eslint-disable-next-line class-methods-use-this
  renderAppTitle() {
    return html`
      <div class="container nowrap">
        <div class="item vcenter logo">
          ${trackerLogoSVG}
        </div>
        <div class="item vcenter">
          ${APP_TITLE}
        </div>
      </div>
    `;
  }

  renderWorldwideCard() {
    if (this.coverage.get(this.config.filter)) {
      return html`
        <worldwide-card
          .coverage=${this.coverage.get(this.config.filter)}
          ?isMobile=${this.isMobile}
          activeFilter=${this.config.sort}
        ></worldwide-card>
      `;
    }

    return html`
      <worldwide-card-skeleton
        ?isMobile=${this.isMobile}
      ></worldwide-card-skeleton>
    `;
  }

  renderUtilityPanel() {
    return html`
      <utility-panel
        .worldwide=${this.coverage.get(this.config.filter)}
        ?isLoading=${this.isLoading}
        ?isMobile=${this.isMobile}
        ?revertIcons=${this.isMobile}
        @handle-search-query=${this.handleSearchQuery}
        @set-config=${this.setConfig}
        filter=${this.config.filter}
        slot="content"
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
