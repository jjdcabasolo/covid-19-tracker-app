# covid-19-tracker-app

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc) [![A progressive web app](https://img.shields.io/badge/-progressive%20web%20%20app-orange)](https://web.dev/progressive-web-apps/)

**COVID-19 Tracker** is a web application that lists ***COVID-19 case count of countries*** around the world.

## DEMO: [Click here to view the demo!](https://jjdcabasolo.github.io/covid-19-tracker-app)

## Case count category
The case count is categorized into three:
1. **Confirmed cases**: includes all types of reported cases, as well as recoveries.
2. **Deaths**: a separate count for all deaths caused by COVID-19
3. **Recoveries**: a subset of the confirmed cases count, presents the number of discharges/patient recoveries

## Tech stack
It is built using web components with the help from [LitElement](https://lit-element.polymer-project.org/). The project was scaffolded using [open-wc](https://open-wc.org/)'s CLI.

For the data source, it uses the free [COVID-19 API](https://api-sports.io/documentation/covid-19) by [api-sports](https://rapidapi.com/user/api-sports) from [RapidAPI](https://rapidapi.com/).

## Main features
- **Country search**: user can search a country via its **name**.
- **Coverage filtering**: user can filter the coverage of the list, either **worldwide** or by **continent**. Total count per coverage is also displayed.
- **Case count sorting**: user can sort the list via [case count category](#case-count-category) in **ascending** or **descending** (*default*) order.
- **Country pinning**: users can pin a country that would **stay on top of the list**. It is saved via `localStorage`.

## Other features
- **Dark mode**: the app's theme adapts to the device/browser's current theme.
- **PWA**: this is a progressive web app, it can be installed on supported devices and can work offline.
> For offline, the data for the last online session would be used.

# A very short history

This is a redesigned spin-off of once was the practice app for my current employer. It was part of the initial tasks given.

If you'll check the [initial commits](https://github.com/jjdcabasolo/covid-19-tracker-app/commit/f7705c4e68920899f2f0752c74a8840fe7756c12), there are a lot of initial files. The from-scratch commits can be found on a private repo.

I asked permission to my boss if I can use that app and put it on my personal portfolio. And it was granted. Yay 🥳🎉

> [This is the original app](http://app-tracker-jourish.herokuapp.com/), the ones I used on our final presentation.

# Quickstart

To run the app locally:

```sh
npm install
npm run start
# requires node 10 & npm 6 or higher
```

# Acknowledgements

I want to thank you the following persons for being a part of the development of this app 😍🥰
- **Boss Mikko, Boss Niko, and Sammy**, for all the help, including lit-element basics, app structure, and code review during the initial app development
- **Kharisa**, **Blessy**, and **RC**, for acting as my design consultants, as well as providing the initial comments and suggestions interface-wise
- **Jemil** and **Camille**  for testing the app, as well as providing suggestions for improvement
- and you, for taking the time to read this long README.md 🤣
