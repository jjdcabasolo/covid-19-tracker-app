import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import '@material/mwc-icon';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';

export default class ScrollToTopButton extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      css`
        .button-container {
          bottom: 0;
          display: flex;
          justify-content: flex-end;
          padding: 0 40px 96px 0;
          position: sticky;
        }
        .button {
          background-color: var(--light-theme-background-color);
          border-radius: 40px;
          box-shadow: var(--card-shadow);
          cursor: pointer;
          height: 48px;
          width: 48px;
        }
        @media screen and (max-width: 600px) {
          .button-container {
            padding: 0 16px 150px 0;
          }
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      isVisible: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.isVisible = false;
  }

  render() {
    if (!this.isVisible) {
      return nothing;
    }

    return html`
      <div class="button-container">
        <div class="button item hcenter vcenter">
          <mwc-icon class="primary-text" @click="${this.handleIconClick}">
            arrow_upward
          </mwc-icon>
        </div>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  handleIconClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

customElements.define('scroll-to-top-button', ScrollToTopButton);
