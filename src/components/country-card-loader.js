import { LitElement, html, css } from 'lit-element';

import darkThemeStyles from '../styles/dark-theme-styles';
import flexboxStyles from '../styles/flexbox-styles';


export default class CountryCardLoader extends LitElement {
  static get styles() {
    return [
      flexboxStyles,
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

        .loader {
          background: linear-gradient(
            -90deg,
            transparent 0%,
            var(--gray-50) 50%,
            transparent 100%
          );
          background-size: 400% 400%;
          animation: pulse 1.2s ease-in-out infinite;
          background-color: var(--gray-300);
        }
        @keyframes pulse {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -135% 0%;
          }
        }

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

        .graph {
          height: 4px;
          margin-top: 16px;
        }

        .count-container {
          margin-top: 24px;
        }
        .count-container:last-child {
          margin-bottom: 16px;
        }

        .count {
          height: 24px;
        }
        .count-label {
          height: 8px;
          margin-top: 8px;
        }
        .count-legend {
          height: 4px;
          margin-top: 4px;
          width: 16px;
        }

        .count-1 {
          width: 75%;
        }
        .count-1-label {
          width: 25%;
        }

        .count-2 {
          width: 45%;
        }
        .count-2-label {
          width: 30%;
        }

        .count-3 {
          width: 65%;
        }
        .count-3-label {
          width: 45%;
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
          <div class="loader header item"></div>

          <div class="loader date"></div>
          <div class="loader time"></div>
          <div class="loader graph"></div>

          <div class="count-container">
            <div class="loader count count-1"></div>
            <div class="loader count-label count-1-label"></div>
            <div class="loader count-legend"></div>
          </div>

          <div class="count-container">
            <div class="loader count count-2"></div>
            <div class="loader count-label count-2-label"></div>
            <div class="loader count-legend"></div>
          </div>

          <div class="count-container">
            <div class="loader count count-3"></div>
            <div class="loader count-label count-3-label"></div>
            <div class="loader count-legend"></div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('country-card-loader', CountryCardLoader);
