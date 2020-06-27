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
          letter-spacing: 0.25px;
          font-weight: 400;
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
      count: { type: Number },
      isCentered: { type: Boolean },
      isHighlighted: { type: Boolean },
      isInline: { type: Boolean },
      newCount: { type: Number },
    };
  }

  constructor() {
    super();

    this.category = '';
    this.count = 0;
    this.isCentered = false;
    this.isHighlighted = false;
    this.isInline = false;
    this.newCount = 0;
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
            ${this.count.toLocaleString()}
          </div>
          ${this.renderNewCount()}
        </div>
        <div
          class="subtitle small-text secondary-text item ${this.isCentered
    ? 'hcenter'
    : ''}"
        >
          ${this.category}
        </div>
        ${this.renderLegend()}
      </div>
    `;
  }

  renderNewCount() {
    const newCountItem = html`
      <div class="new-count small-text secondary-text item vcenter">
        (${this.newCount.toLocaleString()} new)
      </div>
    `;

    if (!Number.isNaN(this.newCount)) {
      if (this.isInline) {
        return newCountItem;
      }

      return html`
        <div class="item ${this.isCentered ? 'hcenter remove-margin' : ''}">
          ${newCountItem}
        </div>
      `;
    }

    return nothing;
  }

  renderLegend() {
    return html`
      <div
        class="item vcenter legend-container ${this.isCentered
    ? 'hcenter'
    : ''}"
      >
        <span
          class="legend ${this.category}-bg ${this.isHighlighted
  ? ''
  : 'inactive-legend'}"
        ></span>
      </div>
    `;
  }
}

customElements.define('case-count', CaseCount);
