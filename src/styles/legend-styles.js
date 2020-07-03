import { css } from 'lit-element';

export default css`
  .inactive-legend {
    opacity: 30%;
  }

  .cases-bg {
    background-color: var(--amber-600);
  }
  .deaths-bg {
    background-color: var(--deep-orange-600);
  }
  .recoveries-bg {
    background-color: var(--light-green-600);
  }
  .tests-bg {
    background-color: var(--cyan-600);
  }

  .cases-c {
    border-color: var(--amber-600);
    color: var(--amber-600);
  }
  .deaths-c {
    border-color: var(--deep-orange-600);
    color: var(--deep-orange-600);
  }
  .recoveries-c {
    border-color: var(--light-green-600);
    color: var(--light-green-600);
  }
  .tests-c {
    border-color: var(--cyan-600);
    color: var(--cyan-600);
  }

  @media (prefers-color-scheme: dark) {
    .cases-bg {
      background-color: var(--amber-200);
    }
    .deaths-bg {
      background-color: var(--deep-orange-200);
    }
    .recoveries-bg {
      background-color: var(--light-green-200);
    }
    .tests-bg {
      background-color: var(--cyan-200);
    }

    .cases-c {
      border-color: var(--amber-200);
      color: var(--amber-200);
    }
    .deaths-c {
      border-color: var(--deep-orange-200);
      color: var(--deep-orange-200);
    }
    .recoveries-c {
      border-color: var(--light-green-200);
      color: var(--light-green-200);
    }
    .tests-c {
      border-color: var(--cyan-200);
      color: var(--cyan-200);
    }
  }
`;
