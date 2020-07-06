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
          background-color: transparent;
          border-radius: 4px;
          border: 1px solid var(--gray-300);
          box-sizing: border-box;
          font-family: 'Roboto Mono', monospace;
          font-size: 14px;
          padding: 8px 16px 8px 36px;
          width: 100%;
        }
        .search-icon {
          left: 8px;
          position: absolute;
          top: 7px;
        }
        .disabled {
          pointer-events: none;
        }
        @media screen and (max-width: 600px) {
          .input-container {
            position: static;
          }
          input[name='countrySearch'] {
            padding: 8px 8px 8px 42px;
          }
          .search-icon {
            --mdc-icon-size: 16px;
            left: 40px;
            top: 36px;
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
          >search</mwc-icon
        >
        <input
          class="primary-text"
          type="search"
          placeholder=${this.hasPlaceholder ? 'search country...' : ''}
          @input="${debounceEvent(() => this.handleSearchQuery(this), 500)}"
          name="countrySearch"
          id="countrySearch"
        />
        <label for="countrySearch"></label>
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
