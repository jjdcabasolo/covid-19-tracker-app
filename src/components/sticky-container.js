import { LitElement, html, css } from 'lit-element';

import darkThemeStyles from '../styles/dark-theme-styles';


export default class StickyContainer extends LitElement {
  static get styles() {
    return [
      css`
        .sticky {
          background-color: var(--light-theme-background-color);
          border-bottom: 1px var(--gray-300) solid;
          margin-left: -8px;
          padding: 24px 8px;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1;
        }
        @media screen and (max-width: 600px) {
          .sticky {
            bottom: 0;
            margin-left: 0;
            padding: 24px;
            top: unset;
            width: unset;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <div class="sticky">
        <slot></slot>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('sticky-container', StickyContainer);
