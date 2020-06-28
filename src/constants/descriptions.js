import { html } from 'lit-element';

import figmaLink from './links';

export default [
  html`
    <div class="small-text primary-text">
      Checkout the outdated
      <a href="${figmaLink}">component mockup</a>
      🖼 for this app!
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Night mode 🌓 depends on your device's theme preference. Try toggling it in settings!
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Animations will be implemented soon 😉
    </div>
  `,
];
