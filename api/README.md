# API

## Description

This API is the facade exposing services through REST services

This API is built upon the Nest.js framework https://nestjs.com/ using TypeScript 4 language.

## Requirements

- NodeJS 16 (install nvm tool to get the required NodeJS version: https://github.com/nvm-sh/nvm#installing-and-updating)

```bash
$ nvm use
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# production-like mode
$ npm run build

$ npm start
```

## Test

```bash
# unit tests
$ npm test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## What is expected for this test

During this test you have to do the following taks:

- Be able to make the tests pass (unit tests & end to end tests)

  => You have to fill one the liveness probe service in order to return the awaited result

  => You have to fix the end 2 end test that fails

- Understand how the API can be called either from a public route or a protcted one (in that latter cas, an additional header is required to get through protected routes)

  => You should be able to talk about what you had understood and what is still to understand

  => Once the service code is ok, you should notice that the frontend `/about` page displays a green panel instead of a red one containing an error; it means the API can be reached by the frontend.

- You have to add another service which will build a users list to send back to the frontend in order to be displayed inside the 'users' page.

  - You can hard code the content of the list or fetch it from an third-party API (as you wish).

  - You have to create a test associated to this route & the newly created service function

- You can go a bit further more to understand how the app is built using the dependency injection  mecanism

🙋🏽‍♂️ The provided Frontend video can help you achieve these goals.
