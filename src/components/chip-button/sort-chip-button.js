import { html } from 'lit-element';
import { nothing } from 'lit-html';

import ChipButton from './chip-button';

export default class SortChipButton extends ChipButton {
  updated(changedProps) {
    if (changedProps.has('value')) {
      this.handleValueChange();
    }
  }

  handleValueChange() {
    if (!this.active.includes(this.label)) {
      this.value = true;
    }
  }

  renderIcon() {
    if (!this.active.includes(this.label)) {
      return nothing;
    }

    return html`
      <div class="item icon vcenter">
        <mwc-icon class="icon">
          ${this.active.includes('asc') ? 'arrow_downward' : 'arrow_upward'}
        </mwc-icon>
      </div>
    `;
  }

  handleClick() {
    let updatedAsc = !this.value;

    if (this.active.includes(this.label)) {
      updatedAsc = !this.active.includes('asc');
    }

    this.value = updatedAsc;
    this.dispatchEvent(
      new CustomEvent('set-config', {
        detail: {
          key: 'sort',
          value: `${this.label}-${updatedAsc ? 'asc' : 'desc'}`,
        },
      })
    );
  }

  evaluateInactive() {
    return this.active.includes(this.label)
      ? `${this.label}-c`
      : 'inactive-chip disabled-text';
  }
}

customElements.define('sort-chip-button', SortChipButton);
