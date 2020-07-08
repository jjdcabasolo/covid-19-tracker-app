import { html } from 'lit-element';

import { figmaLink, historyLink } from './links';

export default [
  html`
    <div class="small-text primary-text">
      Checkout the outdated
      <a href=${figmaLink}>component mockup at Figma</a> for this app!
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Night mode 🌓 depends on your device/browser's theme preference. Try
      toggling it!
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Shoutout to my UI/UX consultants: Kharisa, Blessy, and RC 😍
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Shoutout to my app testers: Jemil and Camille 😍
    </div>
  `,

  html`
    <div class="small-text primary-text">
      Thank you to
      <a href=${historyLink}>the web developers at my current employer</a> that
      reviewed my code 😍
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
      Data may not be 100% accurate. It's a free API, so please bear with the
      API provider 😅
    </div>
  `,
];
