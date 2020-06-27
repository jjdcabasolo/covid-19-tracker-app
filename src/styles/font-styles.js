import { css } from 'lit-element';

export default css`
  /* size */
  .small-text {
    font-size: 12px;
  }
  .medium-text {
    font-size: 16px;
  }
  .large-text {
    font-size: 24px;
  }

  /* color */
  .primary-text {
    color: var(--light-theme-primary-color);
  }
  .secondary-text {
    color: var(--light-theme-secondary-color);
  }
  .disabled-text {
    color: var(--light-theme-disabled-color);
  }

  @media (prefers-color-scheme: dark) {
    .primary-text {
      color: var(--dark-theme-primary-color);
    }
    .secondary-text {
      color: var(--dark-theme-secondary-color);
    }
    .disabled-text {
      color: var(--dark-theme-disabled-color);
    }
  }
`;
