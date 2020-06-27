import { LitElement, html, css } from 'lit-element';

import '@material/mwc-icon';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';
import fontStyles from '../styles/font-styles';
import legendStyles from '../styles/legend-styles';


export default class ChipButton extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
      fontStyles,
      css`
        .chip-button {
          border-radius: 24px;
          border-style: solid;
          border-width: 1px;
          box-sizing: border-box;
          cursor: pointer;
          padding: 4px 12px 4px 8px;
          width: fit-content;
          margin: 4px 0;
        }
        .icon {
          --mdc-icon-size: 16px;
          margin-right: 2px;
        }
        .inactive-chip {
          padding-left: 12px;
          border-color: var(--light-theme-divider-color);
        }
        .active-no-icon {
          padding-left: 12px;
        }
        .label {
          user-select: none;
        }
        :host {
          margin-right: 8px;
        }
      `,
      darkThemeStyles,
      legendStyles,
    ];
  }

  static get properties() {
    return {
      active: { type: String },
      label: { type: String },
      value: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.active = '';
    this.label = '';
    this.value = true;
  }

  render() {
    return html`
      <div
        class="container item chip-button small-text primary-text ${this.evaluateInactive()}"
        @click="${this.handleClick}"
      >
        ${this.renderIcon()}
        <div class="item label">
          ${this.label}
        </div>
      </div>
    `;
  }

  // returns icon (if there is any)
  renderIcon() {
    return this;
  }

  // button click implementation
  handleClick() {
    return this;
  }

  // evaluate if button is inactive
  evaluateInactive() {
    return this;
  }
}
