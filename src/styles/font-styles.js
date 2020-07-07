import { css } from 'lit-element';

export default css`
  /* size */
  .small-text {
    font-size: 0.8rem;
  }
  .medium-text {
    font-size: 1.25rem;
  }
  .large-text {
    font-size: 1.5rem;
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
