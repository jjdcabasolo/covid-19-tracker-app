/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import './chip-button/radio-chip-button';
import './chip-button/sort-chip-button';
import './country-search-form';
import './skeleton-loaders/utility-panel-count-skeleton';
import '@material/mwc-icon';

import darkThemeStyles from '../styles/dark-theme-styles';
import fontStyles from '../styles/font-styles';
import flexboxStyles from '../styles/flexbox-styles';

import filterByCoverage from '../constants/continents';
import sortByCase from '../constants/utility';
import {
  apiSportsLink,
  covidAPILink,
  githubLink,
  rapidAPILink,
} from '../constants/links';

const FILTER = ['worldwide', ...filterByCoverage];

export default class UtilityPanel extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      fontStyles,
      css`
        a:link,
        a:visited {
          color: var(--gray-700);
        }
        .util-container {
          padding-left: 16px;
        }
        .util-item {
          margin: 8px 0;
        }
        .util-item:first-child {
          margin-top: 0;
        }
        .header {
          margin-bottom: 8px;
        }
        .subheader {
          margin-bottom: 4px;
        }
        .icon {
          --mdc-icon-size: 24px;
        }
        .footer .secondary-text {
          font-weight: 200;
        }
        .search-form {
          flex-grow: 1;
          position: relative;
        }
        country-search-form {
          flex-grow: 1;
        }
        .sticky {
          background-color: var(--light-theme-background-color);
          border-bottom: var(--light-theme-card-border);
          height: auto;
          margin-left: -24px;
          padding: 24px 8px 16px 8px;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          transition: height 2s;
          width: 100%;
          z-index: 2;
        }
        .backdrop {
          background-color: var(--light-theme-backdrop-color);
          height: 100%;
          opacity: 0.7;
          position: fixed;
          top: 0;
          width: 100%;
        }
        @media screen and (max-width: 1000px) {
          .util-item {
            margin: 16px 0;
          }
        }
        @media screen and (max-width: 600px) {
          .util-container {
            margin: 24px 0;
          }
          .util-item {
            margin: 0 0 16px 0;
          }
          .sticky {
            border-top: none;
            border-bottom: none;
            border-radius: 16px 16px 0 0;
            bottom: 0;
            margin-left: 0;
            padding: 40px 24px 16px 24px;
            top: unset;
            width: unset;
          }
          :host([sort='cases-desc']) .sticky,
          :host([sort='cases-asc']) .sticky {
            background-color: var(--amber-50);
          }
          :host([sort='deaths-desc']) .sticky,
          :host([sort='deaths-asc']) .sticky {
            background-color: var(--deep-orange-50);
          }
          :host([sort='recoveries-desc']) .sticky,
          :host([sort='recoveries-asc']) .sticky {
            background-color: var(--light-green-50);
          }
          .icon-container {
            position: absolute;
            top: 0;
            width: 100%;
            left: 0;
            border-radius: 16px 16px 0 0;
            cursor: pointer;
          }
          :host([sort='cases-desc']) .sticky .icon-container,
          :host([sort='cases-asc']) .sticky .icon-container {
            background-color: var(--amber-100);
          }
          :host([sort='deaths-desc']) .sticky .icon-container,
          :host([sort='deaths-asc']) .sticky .icon-container {
            background-color: var(--deep-orange-100);
          }
          :host([sort='recoveries-desc']) .sticky .icon-container,
          :host([sort='recoveries-asc']) .sticky .icon-container {
            background-color: var(--light-green-100);
          }
          .coverage {
            margin: 0;
          }
          .util-item:last-child {
            margin-bottom: 0;
          }
          .util-skeleton {
            margin-bottom: 8px;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      filter: { type: String },
      isLoading: { type: Boolean },
      isMobile: { type: Boolean },
      open: { type: Boolean },
      revertIcons: { type: Boolean },
      sort: { type: String },
      worldwide: { type: Object },
    };
  }

  constructor() {
    super();

    this.filter = '';
    this.isLoading = false;
    this.isMobile = false;
    this.open = false;
    this.revertIcons = false;
    this.sort = '';
    this.worldwide = {};
  }

  render() {
    if (this.isMobile) {
      return html`
        ${this.open ? this.renderBackdrop() : nothing}
        <div class="sticky">
          <div class="container search">
            <div
              class="item hcenter icon-container"
              @click="${this.handleIconClick}"
            >
              <mwc-icon class="icon">
                ${this.renderToggleIcon()}
              </mwc-icon>
            </div>
            <div class="item search-form">
              ${this.renderSearchForm()}
            </div>
          </div>
          ${this.open ? this.renderUtility() : nothing}
        </div>
      `;
    }

    return html`${this.renderUtility()}`;
  }

  renderUtility() {
    return html`
      <div
        class="container ${this.isMobile
          ? 'util-skeleton'
          : 'util-container'} vertical"
      >
        ${this.isMobile
          ? nothing
          : html`
              <div class="item util-item vertical">
                <div>${this.renderSearchForm()}</div>
              </div>
              ${this.renderCountDetails()}
            `}

        <div class="item util-item vertical">
          ${this.renderHeader('sort', 'by case')}
          <div class="container">
            ${this.renderSortByCase()}
          </div>
        </div>

        <div class="item util-item vertical">
          ${this.renderHeader('filter', 'by coverage')}
          <div class="container">
            ${this.renderFilterByCoverage()}
          </div>
        </div>

        <div class="item util-item vertical">
          ${this.renderDataSource()}
        </div>

        <div class="item util-item vertical">
          ${this.renderDisclaimer()}
        </div>

        <div class="item util-item vertical footer">
          ${this.renderFooter()}
        </div>
      </div>
    `;
  }

  renderBackdrop() {
    return html`
      <div
        class="backdrop"
        @click=${this.handleIconClick}
        @touchstart=${this.handleIconClick}
      ></div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  renderHeader(primary, secondary) {
    return html`
      <div class="small-text header">
        <span class="primary-text">${primary}</span>
        <span class="secondary-text">${secondary}</span>
      </div>
    `;
  }

  renderSearchForm() {
    return html`
      <country-search-form
        ?readonly=${this.isLoading}
        ?hasPlaceholder=${this.isMobile}
        @handle-search-query=${this.handleSearchQuery}
      >
        ${this.isMobile
          ? html`
              <div slot="label">
                ${this.renderCountDetails()}
              </div>
            `
          : nothing}
      </country-search-form>
    `;
  }

  renderToggleIcon() {
    if (this.revertIcons) {
      return this.open ? 'expand_more' : 'expand_less';
    }
    return this.open ? 'expand_less' : 'expand_more';
  }

  renderCountDetails() {
    const [key, mode] = this.sort.split('-');

    if (this.worldwide) {
      const { continent } = this.worldwide;

      return html`
        <div class="item util-item vertical">
          <div
            class="primary-text ${this.isMobile
              ? 'small-text'
              : 'medium-text'} count"
          >
            ${this.worldwide.countryCount}
            <span class="secondary-text">countries</span>
            ${continent === 'Worldwide'
              ? continent.toLowerCase()
              : `in ${continent}`}
            <span class="secondary-text">listed in</span>
            ${mode === 'desc' ? 'descending' : 'ascending'} number of ${key}
            ${key === 'tests' ? 'conducted' : ''}
          </div>
        </div>
      `;
    }

    return html`
      <utility-panel-count-skeleton size=${this.isMobile ? 'sm' : 'md'}>
      </utility-panel-count-skeleton>
    `;
  }

  renderSortByCase() {
    return sortByCase.map(
      e => html`
        <div class="item">
          <sort-chip-button
            @set-config="${this.setConfig}"
            active="${this.sort}"
            label="${e}"
          ></sort-chip-button>
        </div>
      `
    );
  }

  renderFilterByCoverage() {
    return FILTER.map(
      e => html`
        <div class="item">
          <radio-chip-button
            @set-config="${this.setConfig}"
            active=${this.filter}
            label="${e}"
          >
          </radio-chip-button>
        </div>
      `
    );
  }

  renderDataSource() {
    return html`
      <div class="small-text primary-text">
        The figures are taken from
        <a href=${apiSportsLink}>api-sports</a>'
        <a href=${covidAPILink}>COVID-19 API</a>
        at <a href=${rapidAPILink}>RapidAPI</a>.
      </div>
    `;
  }

  renderDisclaimer() {
    return html`
      <div class="small-text primary-text">
        Data may not be 100% accurate.
        <span class="secondary-text"
          >It's a free API, so please bear with the API provider 😅</span
        >
      </div>
    `;
  }

  renderFooter() {
    return html`
      <div class="primary-text small-text">COVID-19 Tracker</div>
      <div class="secondary-text small-text">
        made with y540 by <a href=${githubLink}>jjdcabasolo</a>
      </div>
      <div class="secondary-text small-text">© 2020. all rights reserved.</div>
    `;
  }

  handleSearchQuery({ detail }) {
    if (this.isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.dispatchEvent(new CustomEvent('handle-search-query', { detail }));
  }

  setConfig({ detail }) {
    this.dispatchEvent(new CustomEvent('set-config', { detail }));
  }

  handleIconClick() {
    document.body.style.overflow = this.open ? '' : 'hidden';
    this.open = !this.open;
  }
}

customElements.define('utility-panel', UtilityPanel);
