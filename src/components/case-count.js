import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';
import fontStyles from '../styles/font-styles';
import legendStyles from '../styles/legend-styles';

export default class CaseCount extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      fontStyles,
      legendStyles,
      css`
        .count {
          font-weight: 500;
          letter-spacing: 0.25px;
        }
        .new-count {
          font-weight: 400;
          letter-spacing: 0.25px;
        }
        .subtitle {
          margin: 2px 0 6px 0;
        }
        .item {
          margin-right: 8px;
        }
        .remove-margin {
          margin-right: 0;
        }
        .highlight {
          font-weight: 600;
        }
        .legend {
          height: 4px;
          width: 16px;
          border-radius: 8px;
        }
        .legend-container {
          margin-top: 4px;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      category: { type: String },
      isCentered: { type: Boolean },
      isHighlighted: { type: Boolean },
      isInline: { type: Boolean },
      label: { type: String },
      subvalue: { type: String },
      value: { type: String },
    };
  }

  constructor() {
    super();

    this.category = '';
    this.value = '';
    this.isCentered = false;
    this.isHighlighted = false;
    this.label = '';
    this.isInline = false;
    this.subvalue = '';
  }

  render() {
    return html`
      <div>
        <div
          class="count large-text container ${this.isInline ? '' : 'vertical'}"
        >
          <div
            class="item primary-text
            ${this.isCentered ? 'hcenter' : ''}
            ${this.isHighlighted ? 'highlight' : ''}"
          >
            ${this.value}
          </div>
          ${this.renderSubvalue()}
        </div>
        <div
          class="subtitle small-text secondary-text item ${this.isCentered
            ? 'hcenter'
            : ''}"
        >
          ${this.label}
        </div>
        ${this.renderLegend()}
      </div>
    `;
  }

  renderSubvalue() {
    const subvalueItem = html`
      <div class="new-count small-text secondary-text item vcenter">
        (${this.subvalue} new)
      </div>
    `;

    if (this.subvalue === 'NaN' || this.subvalue === '0') {
      return nothing;
    }

    if (this.isInline) {
      return subvalueItem;
    }

    return html`
      <div class="item ${this.isCentered ? 'hcenter remove-margin' : ''}">
        ${subvalueItem}
      </div>
    `;
  }

  renderLegend() {
    return html`
      <div
        class="item vcenter legend-container
        ${this.isCentered ? 'hcenter' : ''}"
      >
        <span
          class="legend ${this.category}-bg
          ${this.isHighlighted ? '' : 'inactive-legend'}"
        ></span>
      </div>
    `;
  }
}

customElements.define('case-count', CaseCount);
