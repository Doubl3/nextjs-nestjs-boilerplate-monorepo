# Frontend

## Description

This frontend display content in several languages, can store the user prefered language, can fetch info from an API through its own backend proxy.

The project uses [Next.js 12](https://github.com/zeit/next.js) which is a framework for server-rendered React apps.

It includes `@mui/material` v5 and its peer dependency `Emotion`, the default style engine in MUI v5.

next-i18next (using i18next) for the i18n.

## Requirements

- NodeJS 16 (install nvm tool to get the required NodeJS version: https://github.com/nvm-sh/nvm#installing-and-updating)

```bash
$ nvm use
```

## Installation

```bash
$ npm install --legacy-peer-deps
```

## Running the app

```bash
# development
$ npm run dev

# production-like mode
$ npm run build

$ npm start
```

## What is expected for this test

During this test you have to do the following tasks:

- Display 3 flags (france, usa, japan) to be able to switch between languages (you could use the material-ui library components & icons to help you achieve it more quickly)

  => You could create a dedicated Git branch & commit your modifications inside

- Understand how the API can be called either from client side or from server side (for server side rendering) and hydrate the view by sending JSON data

  => You should be able to talk about what you had understood and what is still to understand

- Add another page 'users' that will display a list of users fetched from the API

  - The list must display, for each item, a MUI avatar component, the user first & last name, the user email and the user phone number.

=> We should be able to navigate to this page from the index page & from the about page. No action can be done when clicking on a user item (it's just a display without interaction; you could use the MUI List & ListItem components to achieve more quickly this step).

  => You should be able to talk about what you had understood and what is still to understand.


🙋🏽‍♂️ The provided video can help you step in this test.
