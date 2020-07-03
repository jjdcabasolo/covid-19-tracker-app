import { LitElement, html, css } from 'lit-element';

import './case-count-skeleton';

import darkThemeStyles from '../../styles/dark-theme-styles';
import flexboxStyles from '../../styles/flexbox-styles';
import skeletonStyles from './skeleton-loaders.styles';

export default class CountryDateItemSkeleton extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      skeletonStyles,
      css`
        .header {
          height: 19px;
          margin: 8px 0;
          width: 50%;
        }

        .date,
        .time {
          height: 12px;
        }
        .date {
          margin-top: 4px;
          width: 90%;
        }
        .time {
          margin-top: 8px;
          width: 40%;
        }
      `,
      darkThemeStyles,
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <div class="loader header item"></div>
      <div class="loader date"></div>
      <div class="loader time"></div>
    `;
  }
}

customElements.define('country-date-item-skeleton', CountryDateItemSkeleton);
