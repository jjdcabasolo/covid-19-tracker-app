import { LitElement, html, css } from 'lit-element';

import './sort-chip-button';
import './radio-chip-button';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';
import fontStyles from '../styles/font-styles';

export default class SortByBanner extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      fontStyles,
      css`
        .sort-container {
          margin-top: 16px;
        }
        .sort-item {
          margin-right: 8px;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      coverage: { type: String },
      count: { type: String },
    };
  }

  constructor() {
    super();

    this.coverage = '';
    this.count = '';
  }

  render() {
    return html`
      <div class="container sort-container">
        ${this.renderItem('sort by:', false)}
        ${this.renderItem('coverage', true)}
        ${['country', 'continent'].map(
    (e) => html`
            <radio-chip-button
              @set-config="${this.setConfig}"
              active="${this.coverage}"
              label="${e}"
            ></radio-chip-button>
          `,
  )}
        ${this.renderItem('', false)} ${this.renderItem('count', true)}
        ${['cases', 'deaths', 'recoveries'].map(
    (e) => html`
            <sort-chip-button
              @set-config="${this.setConfig}"
              active="${this.count}"
              label="${e}"
            ></sort-chip-button>
          `,
  )}
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem(content, isSecondary) {
    return html`
      <div
        class="item sort-item small-text vcenter ${isSecondary
    ? 'secondary-text'
    : 'primary-text'}"
      >
        ${content}
      </div>
    `;
  }

  setConfig({ detail }) {
    this.dispatchEvent(new CustomEvent('set-config', { detail }));
  }
}

customElements.define('sort-by-banner', SortByBanner);
