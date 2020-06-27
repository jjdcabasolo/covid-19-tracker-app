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
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      count: { type: String },
      coverage: { type: String },
      isExpanded: { type: Boolean },
      isMobile: { type: Boolean },
      location: { type: String },
    };
  }

  constructor() {
    super();

    this.count = '';
    this.coverage = '';
    this.isExpanded = true;
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
          ${searchForm} ${sortByForm}
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

          ${this.isExpanded ? nothing : sortByForm}
        </sticky-container>
      `;
    }

    return nothing;
  }

  renderSearchForm() {
    return html`
      <country-search-form
        @handle-search-query="${this.handleSearchQuery}"
      ></country-search-form>
    `;
  }

  renderSortForm() {
    return html`
      <sort-by-banner
        @handle-sort-by="${this.handleSortBy}"
        count="${this.count}"
        coverage="${this.coverage}"
      ></sort-by-banner>
    `;
  }

  handleSearchQuery({ detail }) {
    this.dispatchEvent(new CustomEvent('handle-search-query', { detail }));
  }

  handleSortBy({ detail }) {
    this.dispatchEvent(new CustomEvent('handle-sort-by', { detail }));
  }

  handleIconClick() {
    this.isExpanded = !this.isExpanded;
  }
}

customElements.define('utility-banner', UtilityBanner);
