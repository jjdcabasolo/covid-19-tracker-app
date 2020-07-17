import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import './icon-button';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';

export default class TabletDrawer extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      css`
        .drawer {
          background-color: var(--light-theme-background-color);
          border: var(--light-theme-card-border);
          height: 100vh;
          position: fixed;
          right: 0;
          top: 0;
          width: 0;
        }
        .drawer[open] {
          padding-right: 16px;
          width: 320px;
        }
        .drawer-toggle {
          background-color: var(--light-theme-background-color);
          border-radius: 16px 0 0 16px;
          border: var(--light-theme-card-border);
          height: 60px;
          left: -50px;
          position: absolute;
          width: 48px;
        }
        .backdrop {
          background-color: var(--light-theme-backdrop-color);
          height: 100%;
          opacity: 0.7;
          position: fixed;
          top: 0;
          width: 100%;
        }
      `,
      darkThemeStyles,
    ];
  }

  static get properties() {
    return {
      open: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.open = false;
  }

  render() {
    return html`
      ${this.open
        ? html` <div
            class="backdrop"
            @click=${this.handleIconClick}
            @touchstart=${this.handleIconClick}
          ></div>`
        : nothing}
      <div class="drawer item vcenter" ?open=${this.open}>
        <div
          class="drawer-toggle item hcenter vcenter"
          @click=${this.handleIconClick}
        >
          <icon-button
            icon=${this.open ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}
          ></icon-button>
        </div>
        <slot name="content"></slot>
      </div>
    `;
  }

  handleIconClick() {
    document.body.style.overflow = this.open ? '' : 'hidden';
    this.open = !this.open;
  }
}

customElements.define('tablet-drawer', TabletDrawer);
