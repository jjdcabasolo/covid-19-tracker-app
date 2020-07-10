import { css } from 'lit-element';

export default css`
  @media (prefers-color-scheme: dark) {
    /* country-card-list.js */
    .loader {
      background-color: var(--gray-700);
      background: linear-gradient(
        -90deg,
        transparent 0%,
        var(--gray-800) 50%,
        transparent 100%
      );
      background-size: 400% 400%;
      animation: pulse 1.2s ease-in-out infinite;
    }
    @keyframes pulse {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: -135% 0%;
      }
    }

    /* country-card.js */
    .card,
    /* country-search-form.js */
    input[name='countrySearch'] {
      border: none;
      background-color: var(--dark-theme-card-bg);
    }
    .input-container {
      background-color: var(--dark-theme-html-bg);
    }
    :host([sort='cases-desc']) .sticky,
    :host([sort='cases-asc']) .sticky,
    :host([sort='deaths-desc']) .sticky,
    :host([sort='deaths-asc']) .sticky,
    :host([sort='recoveries-desc']) .sticky,
    :host([sort='recoveries-asc']) .sticky {
      background-color: var(--gray-900);
    }
    @media screen and (max-width: 600px) {
      input[name='countrySearch'] {
        background-color: var(--gray-900);
        border: 1px solid var(--gray-700);
      }
      .input-container {
        background-color: var(--gray-900);
      }
    }

    /* utility-panel.js */
    .expand-icon-container {
      border: 1px solid var(--gray-700);
    }

    /* chip-button.js */
    .chip-button {
      border-color: var(--dark-theme-primary-color);
    }
    .inactive-chip {
      padding-left: 12px;
      border-color: var(--dark-theme-divider-color);
      color: var(--dark-theme-divider-color);
    }

    /* sticky-container.js */
    .sticky {
      background-color: var(--dark-theme-html-bg);
      border-bottom: 1px var(--gray-700) solid;
    }
    @media screen and (max-width: 600px) {
      .sticky {
        background-color: var(--gray-900);
        border-top: 1px var(--gray-900) solid;
      }
    }

    /* app-description.js */
    a:link,
    a:visited {
      color: var(--dark-theme-secondary-color);
    }

    /* scroll-to-top-button.js */
    .button {
      background-color: var(--dark-theme-background-color);
      color: var(--gray-50);
    }
  }
`;
