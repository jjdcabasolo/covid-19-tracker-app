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
          position: sticky;
          justify-content: flex-end;
          display: flex;
          padding: 0 40px 96px 0;
          bottom: 0;
        }

        .button {
          height: 48px;
          width: 48px;
          border-radius: 40px;
          background-color: var(--light-theme-background-color);
          box-shadow: var(--card-shadow);
          cursor: pointer;
        }

        @media screen and (max-width: 600px) {
          .button-container {
            padding: 0 16px 120px 0;
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
          <mwc-icon
            class="search-icon primary-text"
            @click="${this.handleIconClick}"
          >
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
