import { LitElement, html, css } from 'lit-element';

import './case-count';
import './country-date-item';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';

export default class WorldwideCard extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      css`
        .card {
          border-radius: 4px;
          border: 1px solid var(--gray-300);
          box-sizing: border-box;
          display: inline-block;
          margin-bottom: 16px;
          padding: 16px;
          position: relative;
          width: 100%;
        }
        .card:hover {
          box-shadow: var(--card-shadow);
        }
        @media screen and (max-width: 600px) {
          .card {
            padding: 16px 24px;
          }
          .countries:nth-child(2) {
            margin-top: 16px;
          }
          .countries {
            margin: 8px 0;
          }
          .countries:last-child {
            margin-bottom: 0;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      activeFilter: { type: String },
      coverage: { type: Object },
      isMobile: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.activeFilter = '';
    this.coverage = {};
    this.isMobile = false;
  }

  render() {
    const { cases: c, deaths: d } = this.coverage;
    const { total: cases, new: newCases, recovered } = c;
    const { total: deaths, new: newDeaths } = d;

    return html`
      <div class="card">
        <div class="container ${this.isMobile ? 'vertical' : 'equal-space'}">
          ${this.renderCountryDate()}
          ${this.renderCaseCount(
            'confirmed cases',
            cases.toLocaleString(),
            Number(newCases).toLocaleString(),
            this.activeFilter.includes('cases')
          )}
          ${this.renderCaseCount(
            'deaths',
            deaths.toLocaleString(),
            Number(newDeaths).toLocaleString(),
            this.activeFilter.includes('deaths')
          )}
          ${this.renderCaseCount(
            'recoveries',
            recovered.toLocaleString(),
            NaN,
            this.activeFilter.includes('recoveries')
          )}
        </div>
      </div>
    `;
  }

  renderCountryDate() {
    const { time, country } = this.coverage;

    return html`
      <div class="item">
        <country-date-item
          country=${country}
          date="${time}"
        ></country-date-item>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  renderCaseCount(category, count, newCount, isHighlighted) {
    return html`
      <div class="item ${this.isMobile ? 'countries' : 'vcenter'}">
        <case-count
          ?isCentered=${!this.isMobile}
          ?isInline=${this.isMobile}
          ?isHighlighted=${isHighlighted}
          category=${category}
          label=${category}
          subvalue=${newCount}
          value=${count}
        ></case-count>
      </div>
    `;
  }
}

customElements.define('worldwide-card', WorldwideCard);
