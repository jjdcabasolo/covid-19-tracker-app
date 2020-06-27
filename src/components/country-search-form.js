import { LitElement, html, css } from 'lit-element';

import '@material/mwc-icon';

import darkThemeStyles from '../styles/dark-theme-styles';
import fontStyles from '../styles/font-styles';


export default class CountrySearchForm extends LitElement {
  static get styles() {
    return [
      fontStyles,
      css`
        .input-container {
          position: relative;
        }
        input[name='countrySearch'] {
          border-color: var(--light-theme-divider-color);
          border-radius: 2px;
          border-style: solid;
          border-width: 1px;
          box-sizing: border-box;
          font-family: 'Roboto Mono', monospace;
          padding: 8px 16px 8px 52px;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 8px;
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

  render() {
    return html`
      <div class="input-container">
        <mwc-icon
          class="search-icon primary-text"
          @click="${this.handleIconClick}"
          >search</mwc-icon
        >
        <input
          class="medium-text primary-text"
          placeholder="Search country..."
          type="search"
          @input="${this.debounceEvent(
    () => this.handleSearchQuery(this),
    500,
  )}"
          name="countrySearch"
          id="countrySearch"
        />
        <label for="countrySearch"></label>
      </div>
    `;
  }

  // code taken from: https://gist.github.com/nmsdvid/8807205
  // eslint-disable-next-line class-methods-use-this
  debounceEvent(callback, time) {
    let interval;
    return (...args) => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        interval = null;
        callback(...args);
      }, time);
    };
  }

  handleSearchQuery(e) {
    const query = e.shadowRoot.getElementById('countrySearch').value;

    this.dispatchEvent(
      new CustomEvent('handle-search-query', {
        detail: { query },
      }),
    );
  }

  handleIconClick() {
    const input = this.shadowRoot.getElementById('countrySearch');
    input.focus();
  }
}

customElements.define('country-search-form', CountrySearchForm);
