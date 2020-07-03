import { LitElement, html, css } from 'lit-element';

import '@material/mwc-icon';

import darkThemeStyles from '../styles/dark-theme-styles';
import fontStyles from '../styles/font-styles';
import flexboxStyles from '../styles/flexbox-styles';

import descriptions from '../constants/descriptions';

export default class AppDescription extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      fontStyles,
      css`
        a:link,
        a:visited {
          color: var(--gray-700);
        }
        mwc-icon {
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          cursor: pointer;
          margin-right: 8px;
          user-select: none;
        }
        .container {
          flex-wrap: nowrap;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      index: { type: Number },
    };
  }

  constructor() {
    super();

    this.index = 0;
  }

  updated(changedProps) {
    super.updated();

    if (changedProps.has('index')) {
      this.index = Math.floor(Math.random() * descriptions.length);
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="item vcenter">
          <mwc-icon class="primary-text" @click="${this.handleIconClick}">
            keyboard_arrow_right
          </mwc-icon>
        </div>
        <div class="item vcenter">
          ${descriptions[this.index]}
        </div>
      </div>
    `;
  }

  handleIconClick() {
    this.index = Math.floor(Math.random() * descriptions.length);
  }
}

customElements.define('app-description', AppDescription);
