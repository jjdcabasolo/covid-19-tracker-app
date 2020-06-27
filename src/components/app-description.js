import { LitElement, css } from 'lit-element';

import darkThemeStyles from '../styles/dark-theme-styles';
import fontStyles from '../styles/font-styles';

import descriptions from '../constants/descriptions';

export default class AppDescription extends LitElement {
  static get styles() {
    return [
      fontStyles,
      css`
        a:link,
        a:visited {
          color: var(--gray-700);
        }
      `,
      darkThemeStyles,
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return descriptions[0];
  }
}

customElements.define('app-description', AppDescription);
