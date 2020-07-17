import { css } from 'lit-element';

export default css`
  .container,
  .item {
    display: flex;
  }
  .container {
    flex-wrap: wrap;
  }
  .vcenter {
    align-items: center;
  }
  .hcenter {
    justify-content: center;
  }
  .vertical {
    flex-direction: column;
  }
  .equal-space {
    justify-content: space-between;
  }
  .nowrap {
    flex-wrap: nowrap;
  }
`;
