import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import darkThemeStyles from '../../styles/dark-theme-styles';
import skeletonStyles from './skeleton-loaders.styles';

export default class UtilityPanelCountSkeleton extends LitElement {
  static get styles() {
    return [
      skeletonStyles,
      css`
        .count-container {
          margin-bottom: 16px;
        }
        .count-md {
          height: 1.25rem;
          margin: 6px 0 2px 0;
        }
        .count-sm {
          height: 0.75rem;
          margin: 6px 0 2px 0;
        }

        .count-1 {
          width: 65%;
        }
        .count-2 {
          width: 85%;
        }
        .count-3 {
          width: 45%;
        }
        .count-4 {
          width: 35%;
        }

        @media screen and (max-width: 600px) {
          .count-container {
            margin-bottom: 0;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      size: { type: String },
    };
  }

  constructor() {
    super();

    this.size = '';
  }

  render() {
    switch (this.size) {
      case 'md':
        return html`
          <div class="count-container">
            ${Array(4)
              .fill('')
              .map(
                (_, i) => html`
                  <div class="loader count-md count-${i + 1}"></div>
                `
              )}
          </div>
        `;
      case 'sm':
        return html`
          <div class="count-container">
            <div class="loader count-sm"></div>
            <div class="loader count-sm count-3"></div>
          </div>
        `;
      default:
        return nothing;
    }
  }
}

customElements.define(
  'utility-panel-count-skeleton',
  UtilityPanelCountSkeleton
);
