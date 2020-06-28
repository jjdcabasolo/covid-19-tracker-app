import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import './country-search-form';
import './sort-by-banner';
import './sticky-container';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';
import fontStyles from '../styles/font-styles';

export default class UtilityBanner extends LitElement {
  static get styles() {
    return [
      fontStyles,
      flexboxStyles,
      css`
        .content {
          margin: 24px 0;
        }
        .expand-icon-container {
          width: 40px;
        }
        .search-form {
          flex-grow: 1;
          margin-right: 8px;
        }
        country-search-form {
          flex-grow: 1;
        }
        mwc-icon {
          cursor: pointer;
        }
        .count {
          margin-top: 16px;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      count: { type: String },
      countryCount: { type: Number },
      coverage: { type: String },
      isExpanded: { type: Boolean },
      isLoading: { type: Boolean },
      isMobile: { type: Boolean },
      location: { type: String },
    };
  }

  constructor() {
    super();

    this.count = '';
    this.countryCount = 0;
    this.coverage = '';
    this.isExpanded = true;
    this.isLoading = false;
    this.isMobile = false;
    this.location = '';
  }

  render() {
    const searchForm = this.renderSearchForm();
    const sortByForm = this.renderSortForm();

    if (this.location === 'top') {
      if (this.isMobile) {
        return nothing;
      }

      return html`
        <sticky-container>
          ${searchForm}
          ${this.renderCountDetails()}
        </sticky-container>
      `;
    }

    if (this.isMobile) {
      return html`
        <sticky-container>
          <div class="container">
            <div class="item search-form">
              ${searchForm}
            </div>
            <div class="item vcenter hcenter expand-icon-container">
              <mwc-icon @click="${this.handleIconClick}" class="primary-text">
                ${this.isExpanded ? 'more_horiz' : 'expand_more'}
              </mwc-icon>
            </div>
          </div>
          ${this.renderCountDetails()}

          ${this.isExpanded ? nothing : sortByForm}
        </sticky-container>
      `;
    }

    return nothing;
  }

  renderSearchForm() {
    return html`
      <country-search-form
        ?readonly="${this.isLoading}"
        @handle-search-query="${this.handleSearchQuery}"
      ></country-search-form>
    `;
  }

  renderSortForm() {
    return html`
      <sort-by-banner
        @set-config="${this.setConfig}"
        count="${this.count}"
        coverage="${this.coverage}"
      ></sort-by-banner>
    `;
  }

  renderCountDetails() {
    if (this.countryCount <= 0) {
      return nothing;
    }

    return html`
      <div class="primary-text small-text count">
        ${this.countryCount}
        <span class="secondary-text">countries listed</span>
      </div>
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

customElements.define('utility-banner', UtilityBanner);
