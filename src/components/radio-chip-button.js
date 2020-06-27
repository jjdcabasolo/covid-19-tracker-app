import ChipButton from './chip-button';

export default class RadioChipButton extends ChipButton {
  // eslint-disable-next-line class-methods-use-this
  renderIcon() {
    return null;
  }

  handleClick() {
    if (this.active === this.label) {
      return null;
    }

    this.dispatchEvent(
      new CustomEvent('handle-sort-by', {
        detail: {
          type: 'coverage',
          sortBy: `${this.label}`,
        },
      })
    );

    return null;
  }

  evaluateInactive() {
    return this.active === this.label
      ? 'active-no-icon'
      : 'inactive-chip disabled-text';
  }
}

customElements.define('radio-chip-button', RadioChipButton);
