import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';
import fontStyles from '../styles/font-styles';

import { formatCountryName, getCountryCode } from '../utils/country';
import ordinalize from '../utils/ordinalize';

import months from '../constants/months';

export default class CountryDateItem extends LitElement {
  static get styles() {
    return [
      fontStyles,
      flexboxStyles,
      css`
        .container {
          flex-wrap: nowrap;
          flex-grow: 1;
        }
        .country {
          flex-grow: 1;
          font-weight: 400;
        }
        img {
          height: 20px;
          width: 20px;
        }
        .flag {
          display: flex;
          align-items: center;
        }
        .date {
          margin-top: 4px;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      country: { type: String },
      date: { type: String },
      isCentered: { type: Boolean },
      rank: { type: Number },
      total: { type: Number },
      withFlag: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.country = '';
    this.date = '';
    this.isCentered = false;
    this.rank = -1;
    this.total = 0;
    this.withFlag = false;
  }

  render() {
    const date = new Date(this.date);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const time = date.toLocaleTimeString();

    return html`
      <div class="container">
        <div class="item country large-text primary-text">
          ${this.processCountryNames()}
        </div>
        <div class="item flag">
          ${this.renderFlag()}
        </div>
      </div>
      <div
        class="date small-text secondary-text item ${this.isCentered
          ? 'hcenter'
          : ''}"
      >
        ${this.rank > -1
          ? html`
              <span class="primary-text"
                >${ordinalize(this.rank + 1)}&nbsp;</span
              >
            `
          : nothing}
        as of ${month} ${day}, ${year}
      </div>
      <div
        class="date small-text secondary-text item ${this.isCentered
          ? 'hcenter'
          : ''}"
      >
        ${time}
      </div>
    `;
  }

  renderFlag() {
    if (this.withFlag) {
      let formattedCountryName = formatCountryName(this.country);
      if (formattedCountryName === 'uk') {
        formattedCountryName = 'united kingdom';
      }

      const code = getCountryCode(formattedCountryName);

      if (window.navigator.onLine) {
        return html`
          <img
            alt="The National Flag of ${this.country}."
            class="country-flag"
            src="https://flagcdn.com/${code.toLowerCase()}.svg"
          />
        `;
      }

      return nothing;
    }

    return nothing;
  }

  /*
    some country names have html elements on it.
    it is not properly decoded to text.
    this code make sure that does not happen.
    code taken from https://stackoverflow.com/a/7394787/13245200
  */
  processCountryNames() {
    const dummyTextarea = document.createElement('textarea');

    dummyTextarea.innerHTML = this.country;
    return dummyTextarea.value;
  }
}

customElements.define('country-date-item', CountryDateItem);
