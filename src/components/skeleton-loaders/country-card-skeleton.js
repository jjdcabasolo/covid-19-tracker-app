import { LitElement, html, css } from 'lit-element';

import './country-date-item-skeleton';
import './case-count-skeleton';

import darkThemeStyles from '../../styles/dark-theme-styles';
import flexboxStyles from '../../styles/flexbox-styles';
import skeletonStyles from './skeleton-loaders.styles';

export default class CountryCardSkeleton extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      skeletonStyles,
      css`
        .card {
          border-radius: 4px;
          box-sizing: border-box;
          display: inline-block;
          padding: 16px;
          position: static;
          width: 240px;
          border: 1px solid var(--gray-300);
          z-index: 1;
        }

        @media screen and (max-width: 1039px) {
          .card {
            width: 100%;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <div class="card">
        <div class="loader-container">
          <country-date-item-skeleton></country-date-item-skeleton>

          ${Array(3)
            .fill('')
            .map(
              (_, i) => html`
                <case-count-skeleton variant=${i}></case-count-skeleton>
              `
            )}
        </div>
      </div>
    `;
  }
}

customElements.define('country-card-skeleton', CountryCardSkeleton);
