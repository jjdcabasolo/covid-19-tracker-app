import { css } from 'lit-element';

export default css`
  .loader {
    animation: pulse 1.2s ease-in-out infinite;
    background: linear-gradient(
      -90deg,
      transparent 0%,
      var(--gray-50) 50%,
      transparent 100%
    );
    background-color: var(--gray-300);
    background-size: 400% 400%;
  }
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;
