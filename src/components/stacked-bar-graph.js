import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

import legendStyles from '../styles/legend-styles';
import flexboxStyles from '../styles/flexbox-styles';


export default class StackedBarGraph extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      legendStyles,
      css`
        .bar {
          height: 4px;
          border-radius: 8px;
          margin: 0 1%;
        }
        .bar:first-child {
          margin-left: 0;
        }
        .bar:last-child {
          margin-right: 0;
        }
        .hide {
          display: none;
        }
      `,
    ];
  }

  static get properties() {
    return {
      activeFilter: { type: String },
      cases: { type: Number },
      styles: { type: Object },
      deaths: { type: Number },
      recoveries: { type: Number },
    };
  }

  constructor() {
    super();

    this.activeFilter = '';
    this.cases = 0;
    this.styles = {};
    this.deaths = 0;
    this.recoveries = 0;
  }

  updated(changedProperties) {
    if (changedProperties.has('cases')) {
      this.calculateBarWidth();
    }
  }

  render() {
    return html`
      <div class="container">
        ${this.renderBar('cases')} ${this.renderBar('deaths')}
        ${this.renderBar('recoveries')}
      </div>
    `;
  }

  renderBar(category) {
    return html`
      <div
        class="item bar ${category}-bg ${this.activeFilter.includes(category)
  ? ''
  : 'inactive-legend'} ${this[category] > 0 ? '' : 'hide'}"
        style=${styleMap(this.styles[category])}
      ></div>
    `;
  }

  calculateBarWidth() {
    const total = this.cases + this.deaths + this.recoveries;
    let casesWidth = Math.ceil((this.cases / total) * 100);
    const deathsWidth = Math.ceil((this.deaths / total) * 100);
    const recoveriesWidth = Math.ceil((this.recoveries / total) * 100);
    const totalWidth = casesWidth + deathsWidth + recoveriesWidth;
    if (totalWidth > 100) {
      casesWidth -= totalWidth - 100;
    }
    let adjustment = 0;
    if (this.deaths > 0) {
      adjustment += 3;
    }
    if (this.recoveries > 0) {
      adjustment += 2;
    }
    if (adjustment > 4) {
      adjustment = 4;
    }
    this.styles = {
      cases: { flexBasis: `${casesWidth - adjustment}%` },
      deaths: { flexBasis: `${deathsWidth}%` },
      recoveries: { flexBasis: `${recoveriesWidth}%` },
    };
  }
}

customElements.define('stacked-bar-graph', StackedBarGraph);
