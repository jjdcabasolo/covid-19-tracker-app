/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';

import './case-count';
import './country-date-item';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';
import fontStyles from '../styles/font-styles';

import formatCountryName from '../utils/formatCountryName';

export default class CountryCard extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      fontStyles,
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
        @media screen and (max-width: 600px) {
          .card {
            padding: 16px 24px;
          }
        }
        .statistic-container {
          margin-top: 16px;
        }
        .statistic {
          margin: 16px 0;
        }
        .statistic:first-child {
          margin-top: 0;
        }
        .statistic:last-child {
          margin-bottom: 0;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      country: { type: Object },
      filter: { type: String },
      sort: { type: String },
    };
  }

  constructor() {
    super();

    this.country = {};
    this.filter = '';
    this.sort = '';
  }

  render() {
    const {
      cases: c,
      country,
      deaths: d,
      population,
      position: rank,
      tests: t,
      time,
    } = this.country;
    const { total: cases, new: newCases, recovered } = c;
    const { total: deaths, new: newDeaths } = d;
    const { total: tests } = t;

    const testPercentage =
      tests / population > 0 && population > 0
        ? ((tests / population) * 100).toFixed(2)
        : 0;

    return html`
      <div class="card">
        <country-date-item
          ?withFlag=${true}
          country=${formatCountryName(country, false)}
          date=${time}
          rank=${rank}
        ></country-date-item>

        <div class="statistic-container">
          ${this.renderStatistic(
            'confirmed cases',
            'cases',
            this.sort.includes('cases'),
            cases.toLocaleString(),
            Number(newCases).toLocaleString()
          )}
          ${this.renderStatistic(
            'deaths',
            'deaths',
            this.sort.includes('deaths'),
            deaths.toLocaleString(),
            Number(newDeaths).toLocaleString()
          )}
          ${this.renderStatistic(
            'recoveries',
            'recoveries',
            this.sort.includes('recoveries'),
            recovered.toLocaleString(),
            NaN
          )}
          ${this.renderStatistic(
            'of the population tested',
            'tests',
            this.sort.includes('tests'),
            `${testPercentage || 0}%`,
            NaN
          )}
        </div>
      </div>
    `;
  }

  renderStatistic(...details) {
    const [label, category, isHighlighted, count, newCount] = details;

    return html`
      <div class="statistic">
        <case-count
          ?isHighlighted=${isHighlighted}
          ?isInline=${true}
          category=${category}
          label=${label}
          subvalue=${newCount}
          value=${count}
        ></case-count>
      </div>
    `;
  }

  renderSubheader(content) {
    return html`
      <div class="subheader-container">
        <div class="secondary-text subheader">
          ${content}
        </div>
      </div>
    `;
  }
}

customElements.define('country-card', CountryCard);
