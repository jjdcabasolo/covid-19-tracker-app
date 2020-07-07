import { LitElement, html, css } from 'lit-element';

import './case-count-skeleton';
import './country-date-item-skeleton';

import darkThemeStyles from '../../styles/dark-theme-styles';
import flexboxStyles from '../../styles/flexbox-styles';
import skeletonStyles from './skeleton-loaders.styles';

export default class WorldwideCardSkeleton extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      skeletonStyles,
      css`
        .item {
          flex-basis: 25%;
        }
        country-date-item-skeleton,
        case-count-skeleton {
          width: 100%;
        }
        .card {
          border-radius: 4px;
          border: 1px solid var(--gray-300);
          box-sizing: border-box;
          display: inline-block;
          margin-bottom: 16px;
          padding: 16px;
          position: static;
          width: 100%;
          z-index: 1;
        }
        @media screen and (max-width: 1039px) {
          .card {
            width: 100%;
          }
        }
        @media screen and (max-width: 600px) {
          .item {
            flex-basis: 100%;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      isMobile: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.isMobile = false;
  }

  render() {
    return html`
      <div class="card">
        <div class="container ${this.isMobile ? 'vertical' : 'equal-space'}">
          <div class="item">
            <country-date-item-skeleton></country-date-item-skeleton>
          </div>
          ${Array(3)
            .fill('')
            .map(
              (_, i) => html`
                <div class="item ${this.isMobile ? 'countries' : 'vcenter'}">
                  <case-count-skeleton
                    ?isCentered=${!this.isMobile}
                    ?hasMarginTop=${this.isMobile}
                    variant=${i}
                  ></case-count-skeleton>
                </div>
              `
            )}
        </div>
      </div>
    `;
  }
}

customElements.define('worldwide-card-skeleton', WorldwideCardSkeleton);
