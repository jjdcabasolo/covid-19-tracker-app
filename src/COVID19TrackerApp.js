import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import './components/app-description';
import './components/country-list-connected';
import './components/utility-banner';
import './components/worldwide-banner';

import darkThemeStyles from './styles/dark-theme-styles';
import flexboxStyles from './styles/flexbox-styles';
import fontStyles from './styles/font-styles';

export default class COVID19TrackerApp extends LitElement {
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
      isLoading: { type: Boolean },
      isMobile: { type: Boolean },
      query: { type: String },
      config: { type: Object },
      worldwide: { type: Object },
    };
  }

  constructor() {
    super();

    this.error = '';
    this.isLoading = true;
    this.isMobile = window.innerWidth < 600;
    this.query = '';
    this.config = {
      count: 'cases-desc',
      coverage: 'country',
      countryCount: 0,
    };
    this.worldwide = {};
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', () => COVID19TrackerApp.handleResize(this));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', () => COVID19TrackerApp.handleResize(this));
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

        ${this.renderUtilityBanner('top')}

        <div class="content">
          <country-list-connected
            ?isMobile="${this.isMobile}"
            @handle-error="${this.handleError}"
            @handle-fetching="${this.handleFetching}"
            @set-config="${this.setConfig}"
            @handle-worldwide-update="${this.handleWorldwideUpdate}"
            @update-is-fetching="${this.updateIsFetching}"
            count="${this.config.count}"
            coverage="${this.config.coverage}"
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
    return html`
      <utility-banner
        .countryCount="${this.config.countryCount}"
        ?isLoading="${this.isLoading}"
        ?isMobile="${this.isMobile}"
        @handle-search-query="${this.handleSearchQuery}"
        count="${this.config.count}"
        coverage="${this.config.coverage}"
        location="${location}"
      ></utility-banner>
    `;
  }

  static handleResize(context) {
    // eslint-disable-next-line no-param-reassign
    context.isMobile = window.innerWidth < 600;
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

  handleWorldwideUpdate({ detail }) {
    const { worldwide } = detail;

    this.worldwide = worldwide;
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
