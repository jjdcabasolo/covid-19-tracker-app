import { html } from 'lit-element';

import { figmaLink, linkedInLink } from './links';

export default [
  html`
    <div class="small-text primary-text">
      Checkout the outdated
      <a href=${figmaLink}>component mockup at Figma</a> for this app!
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Night mode 🌓 depends on your browser's theme preference. Try toggling it!
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Shoutout to my design consultants: Kharisa, Blessy, and RC 😍
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Shoutout to my app testers: Jemil and Camille 😍
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Country pinning 📌 will be implemented soon!
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Noticed something wrong? Send it here at my
      <a href="mailto:abasolojohnjourish@gmail.com">email</a>.
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Here's my <a href=${linkedInLink}>LinkedIn</a> account. Nothing, just
      saying. 😉
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Noticed something wrong? Send it here at my
      <a href="mailto:abasolojohnjourish@gmail.com">email</a>.
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Night mode 🌓 depends on your browser's theme preference. Try toggling it!
    </div>
  `,
];
