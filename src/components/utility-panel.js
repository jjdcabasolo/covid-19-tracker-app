/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import '@material/mwc-icon';
import './country-search-form';
import './chip-button/sort-chip-button';
import './chip-button/radio-chip-button';
import './skeleton-loaders/utility-panel-count-skeleton';

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
          --mdc-icon-size: 16px;
          margin-right: 2px;
        }
        .footer .secondary-text {
          font-weight: 200;
        }
        .search-form {
          flex-grow: 1;
          margin-right: 8px;
        }
        country-search-form {
          flex-grow: 1;
        }
        .sticky {
          background-color: var(--light-theme-background-color);
          border-bottom: 1px var(--gray-300) solid;
          margin-left: -8px;
          padding: 24px 8px 16px 8px;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 2;
        }
        .expand-icon-container {
          width: 40px;
          cursor: pointer;
        }
        @media screen and (max-width: 600px) {
          .util-container {
            margin: 24px 0;
          }
          .util-item {
            margin: 0 0 16px 0;
          }
          .sticky {
            border-top: 1px var(--gray-300) solid;
            border-radius: 16px 16px 0 0;
            bottom: 0;
            margin-left: 0;
            padding: 24px;
            top: unset;
            width: unset;
          }
          .coverage {
            margin: 0;
          }
          .util-item:last-child {
            margin-bottom: 0;
          }
          .search {
            margin-bottom: 16px;
          }
          .util-skeleton {
            margin-top: 16px;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      filter: { type: String },
      isExpanded: { type: Boolean },
      isLoading: { type: Boolean },
      isMobile: { type: Boolean },
      revertIcons: { type: Boolean },
      sort: { type: String },
      worldwide: { type: Object },
    };
  }

  constructor() {
    super();

    this.filter = '';
    this.isExpanded = true;
    this.isLoading = false;
    this.isMobile = false;
    this.revertIcons = false;
    this.sort = '';
    this.worldwide = {};
  }

  render() {
    if (this.isMobile) {
      return html`
        <div class="sticky">
          <div class="container search">
            <div class="item search-form">
              ${this.renderSearchForm()}
            </div>
            <div class="item vcenter hcenter expand-icon-container">
              <mwc-icon @click="${this.handleIconClick}" class="primary-text">
                ${this.renderToggleIcon()}
              </mwc-icon>
            </div>
          </div>
          ${this.renderCountDetails()}
          ${this.isExpanded ? nothing : this.renderUtility()}
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
                ${this.renderHeader('search', 'by country')}
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

        <div class="item util-item vertical footer">
          ${this.renderFooter()}
        </div>
      </div>
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
      ></country-search-form>
    `;
  }

  renderToggleIcon() {
    if (this.revertIcons) {
      return this.isExpanded ? 'expand_less' : 'expand_more';
    }
    return this.isExpanded ? 'expand_more' : 'expand_less';
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
      </div>
      <div class="small-text primary-text">
        <a href=${apiSportsLink}>api-sports</a>'
        <a href=${covidAPILink}>COVID-19 API</a>
        at <a href=${rapidAPILink}>RapidAPI</a>.
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
    this.dispatchEvent(new CustomEvent('handle-search-query', { detail }));
  }

  setConfig({ detail }) {
    this.dispatchEvent(new CustomEvent('set-config', { detail }));
  }

  handleIconClick() {
    this.isExpanded = !this.isExpanded;
  }
}

customElements.define('utility-panel', UtilityPanel);
