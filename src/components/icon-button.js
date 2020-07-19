import { LitElement, html, css } from 'lit-element';

import '@material/mwc-icon';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';
import fontStyles from '../styles/font-styles';

export default class IconButton extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      css`
        .icon-container {
          cursor: pointer;
        }
        .icon {
          color: var(--light-theme-secondary-color);
          --mdc-icon-size: 24px;
        }
        @media screen and (max-width: 600px) {
          .icon {
            --mdc-icon-size: 28px;
          }
        }
        :host([inactive]) .icon-container .icon {
          color: var(--light-theme-icon-button-inactive-color);
        }
      `,
      darkThemeStyles,
      fontStyles,
    ];
  }

  static get properties() {
    return {
      inactive: { type: Boolean },
      icon: { type: String },
    };
  }

  constructor() {
    super();

    this.inactive = false;
    this.icon = '';
  }

  render() {
    return html`
      <div class="icon-container item vcenter hcenter">
        <mwc-icon @click="${this.handleIconClick}" class="icon">
          ${this.icon}
        </mwc-icon>
      </div>
    `;
  }

  handleIconClick() {
    this.dispatchEvent(new CustomEvent('handle-icon-click'));
  }
}

customElements.define('icon-button', IconButton);
