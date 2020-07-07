import ChipButton from './chip-button';

export default class RadioChipButton extends ChipButton {
  handleClick() {
    if (this.active === this.label) {
      return null;
    }

    this.dispatchEvent(
      new CustomEvent('set-config', {
        detail: {
          key: 'filter',
          value: `${this.label}`,
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
