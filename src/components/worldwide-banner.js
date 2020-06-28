import { LitElement, html, css } from 'lit-element';

import './case-count';
import './country-date-item';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';

export default class WorldwideBanner extends LitElement {
  static get styles() {
    return [
      css`
        @media screen and (max-width: 600px) {
          .item {
            flex-basis: 100%;
            justify-content: center;
            margin: 8px 0;
          }
          .container {
            margin: 8px 0 8px 0;
          }
        }
      `,
      flexboxStyles,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      cases: { type: Number },
      deaths: { type: Number },
      isMobile: { type: Boolean },
      newCases: { type: Number },
      newDeaths: { type: Number },
      recovered: { type: Number },
      time: { type: String },
    };
  }

  constructor() {
    super();

    this.cases = 0;
    this.deaths = 0;
    this.isMobile = false;
    this.newCases = 0;
    this.newDeaths = 0;
    this.recovered = 0;
    this.time = '';
  }

  render() {
    return html`
      <div class="container equal-space">
        ${this.renderCountryDate()}
        ${this.renderCaseCount(true, 'cases', this.cases, this.newCases)}
        ${this.renderCaseCount(true, 'deaths', this.deaths, this.newDeaths)}
        ${this.renderCaseCount(true, 'recoveries', this.recovered, NaN)}
      </div>
    `;
  }

  renderCountryDate() {
    return html`
      <div class="item">
        <country-date-item
          ?isCentered="${this.isMobile}"
          country="Worldwide cases"
          date="${this.time}"
        ></country-date-item>
      </div>
    `;
  }

  renderCaseCount(isHighlighted, category, count, newCount) {
    return html`
      <div class="item">
        <case-count
          ?isCentered="${this.isMobile}"
          ?isHighlighted="${isHighlighted}"
          category="${category}"
          count="${count}"
          newCount="${newCount}"
        ></case-count>
      </div>
    `;
  }
}

customElements.define('worldwide-banner', WorldwideBanner);
