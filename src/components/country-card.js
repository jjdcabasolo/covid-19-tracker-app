import { LitElement, html, css } from 'lit-element';

import './case-count';
import './country-date-item';
import './stacked-bar-graph';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';

export default class CountryCard extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      css`
        :host {
          width: inherit;
        }
        .card {
          border-radius: 4px;
          box-sizing: border-box;
          display: inline-block;
          padding: 16px;
          position: relative;
          width: 240px;
          border: 1px solid var(--gray-300);
        }
        .card:hover {
          box-shadow: var(--card-shadow);
        }
        @media screen and (max-width: 1039px) {
          .card {
            width: inherit;
          }
        }
        .statistic-container {
          margin: 16px 0 8px 0;
        }
        .statistic {
          margin: 16px 0;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      activeFilter: { type: String },
      cases: { type: Number },
      country: { type: String },
      coverage: { type: String },
      deaths: { type: Number },
      newCases: { type: Number },
      newDeaths: { type: Number },
      rank: { type: Number },
      recovered: { type: Number },
      time: { type: String },
    };
  }

  constructor() {
    super();

    this.activeFilter = '';
    this.cases = 0;
    this.country = '';
    this.coverage = '';
    this.deaths = 0;
    this.newCases = 0;
    this.newDeaths = 0;
    this.rank = -1;
    this.recovered = 0;
    this.time = '';
  }

  render() {
    return html`
      <div class="card">
        <country-date-item
          ?withFlag="${this.coverage === 'country'}"
          country="${this.country}"
          date="${this.time}"
          rank="${this.rank}"
        ></country-date-item>

        <div class="statistic-container">
          <stacked-bar-graph
            activeFilter="${this.activeFilter}"
            cases="${this.cases}"
            deaths="${this.deaths}"
            recoveries="${this.recovered}"
          ></stacked-bar-graph>
        </div>

        <div class="statistic-container">
          ${this.renderStatistic(
            'cases',
            this.activeFilter.includes('cases'),
            true,
            this.cases,
            this.newCases
          )}
          ${this.renderStatistic(
            'deaths',
            this.activeFilter.includes('deaths'),
            true,
            this.deaths,
            this.newDeaths
          )}
          ${this.renderStatistic(
            'recoveries',
            this.activeFilter.includes('recoveries'),
            true,
            this.recovered,
            NaN
          )}
        </div>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  renderStatistic(label, isHighlighted, isInline, count, newCount) {
    return html`
      <div class="statistic">
        <case-count
          ?isHighlighted="${isHighlighted}"
          ?isInline="${isInline}"
          category="${label}"
          count="${count}"
          newCount="${newCount}"
        ></case-count>
      </div>
    `;
  }
}

customElements.define('country-card', CountryCard);
