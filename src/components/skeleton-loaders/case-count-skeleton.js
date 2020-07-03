import { LitElement, html, css } from 'lit-element';

import darkThemeStyles from '../../styles/dark-theme-styles';
import flexboxStyles from '../../styles/flexbox-styles';
import skeletonStyles from './skeleton-loaders.styles';

export default class CaseCountSkeleton extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      skeletonStyles,
      css`
        .count-container {
          margin-top: 24px;
        }
        .last-child {
          margin-bottom: 16px;
        }

        .count {
          height: 24px;
        }
        .count-label {
          height: 8px;
          margin-top: 8px;
        }
        .count-legend {
          height: 4px;
          margin-top: 4px;
          width: 16px;
        }

        .count-1 {
          width: 75%;
        }
        .count-1-label {
          width: 25%;
        }

        .count-2 {
          width: 45%;
        }
        .count-2-label {
          width: 30%;
        }

        .count-3 {
          width: 65%;
        }
        .count-3-label {
          width: 45%;
        }

        .count-4 {
          width: 95%;
        }
        .count-4-label {
          width: 15%;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      variant: { type: Number },
    };
  }

  constructor() {
    super();

    this.variant = 0;
  }

  render() {
    return html`
      <div class="count-container">
        <div class="loader count count-${this.variant + 1}"></div>
        <div class="loader count-label count-${this.variant + 1}-label"></div>
        <div class="loader count-legend"></div>
      </div>
    `;
  }
}

customElements.define('case-count-skeleton', CaseCountSkeleton);
