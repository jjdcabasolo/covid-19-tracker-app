/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';

import './icon-button';
import './case-count';
import './country-date-item';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';
import fontStyles from '../styles/font-styles';

import { formatCountryName } from '../utils/country';

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
        .country-pin {
          position: absolute;
          right: 16px;
          bottom: 16px;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      country: { type: Object },
      filter: { type: String },
      isPinned: { type: Boolean },
      sort: { type: String },
    };
  }

  constructor() {
    super();

    this.country = {};
    this.filter = '';
    this.isPinned = false;
    this.sort = '';
  }

  render() {
    const { cases: c, country, deaths: d, position: rank, time } = this.country;
    const { total: cases, new: newCases, recovered } = c;
    const { total: deaths, new: newDeaths } = d;

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
        </div>

        <div class="country-pin">
          <icon-button
            ?inactive=${!this.isPinned}
            @handle-icon-click=${this.handleIconClick}
            icon="push_pin"
          ></icon-button>
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

  handleIconClick() {
    this.dispatchEvent(
      new CustomEvent('set-pin', {
        detail: {
          code: this.country.code,
        },
      })
    );
  }
}

customElements.define('country-card', CountryCard);
