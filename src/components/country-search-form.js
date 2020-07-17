import { LitElement, html, css } from 'lit-element';

import '@material/mwc-icon';

import darkThemeStyles from '../styles/dark-theme-styles';
import fontStyles from '../styles/font-styles';

import debounceEvent from '../utils/debounce';

export default class CountrySearchForm extends LitElement {
  static get styles() {
    return [
      fontStyles,
      css`
        .input-container {
          position: relative;
        }
        input[name='countrySearch'] {
          background-color: var(--light-theme-background-color);
          border-radius: 4px;
          border: var(--light-theme-card-border);
          box-sizing: border-box;
          font-family: 'Roboto Mono', monospace;
          font-size: 14px;
          margin: 8px 0;
          padding: 8px 16px 8px 36px;
          width: 100%;
        }
        .search-icon {
          bottom: 13px;
          left: 8px;
          position: absolute;
        }
        .disabled {
          pointer-events: none;
        }
        @media screen and (max-width: 600px) {
          .input-container {
            position: static;
          }
          input[name='countrySearch'] {
            padding: 8px 8px 8px 36px;
            margin: 16px 0;
          }
          .search-icon {
            --mdc-icon-size: 16px;
            bottom: 26px;
            left: 12px;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      hasPlaceholder: { type: Boolean },
      readonly: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.hasPlaceholder = false;
    this.readonly = false;
  }

  render() {
    return html`
      <div class="input-container ${this.readonly ? 'disabled' : ''}">
        <mwc-icon
          class="search-icon primary-text"
          @click="${this.handleIconClick}"
        >
          search
        </mwc-icon>
        <label for="countrySearch" class="small-text">
          <slot name="label">
            <span class="primary-text">search</span>
            <span class="secondary-text">by country</span>
          </slot>
        </label>
        <input
          @input="${debounceEvent(() => this.handleSearchQuery(this), 500)}"
          aria-labelledby="countrySearch"
          class="primary-text"
          id="countrySearch"
          name="countrySearch"
          placeholder=${this.hasPlaceholder ? 'search country...' : ''}
          type="search"
        />
      </div>
    `;
  }

  handleSearchQuery(e) {
    const query = e.shadowRoot.getElementById('countrySearch').value;

    this.dispatchEvent(
      new CustomEvent('handle-search-query', {
        detail: { query },
      })
    );
  }

  handleIconClick() {
    const input = this.shadowRoot.getElementById('countrySearch');

    input.focus();
  }
}

customElements.define('country-search-form', CountrySearchForm);
