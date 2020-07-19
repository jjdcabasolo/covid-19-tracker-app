import { css } from 'lit-element';

export default css`
  .card {
    border-radius: 4px;
    border: var(--light-theme-card-border);
    box-sizing: border-box;
    background-color: var(--light-theme-background-color);
    display: inline-block;
    padding: 16px;
    position: relative;
  }
  @media screen and (max-width: 600px) {
    .card {
      padding: 16px 24px;
    }
  }
`;
