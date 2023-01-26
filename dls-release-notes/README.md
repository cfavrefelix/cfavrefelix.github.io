# Sage Design System Pattern: Release Notes

This is a demo application for the Sage Design System Release Notes pattern. It is intended as an example for other teams to work from, or a base to start their work.

## Running locally

To run this application locally, run these commands in a terminal:

```bash
$ git clone https://github.com/Sage/dls-release-notes.git && cd dls-release-notes
$ yarn install
$ yarn start
```

This will open the local version of the application on port http://localhost:3000.

You can customize the options by changing the `data-release-note-options` attribute on the root element in `./public/index.html`. 

## Using in production

This is a template application which uses static files to act as a backend to provide the data. It was developed as an interactive example of the release notes pattern. We hope that it may be a useful starting point for other teams, if it fits their needs.

If you wish to use this in production then I recommend that you fork this repository to create a custom version which matches your specific product. There are some customisation options built in, [detailed here](./docs/available-options.md).

The full specification for the backend required for this application is [detailed here](./docs/server-specification.md).

This implementation does not come with a garentee of support implemting it, or with a garentee of help with production bugs. Any team is welcome to reach out to the design system team for advice or help but it is not garenteed due to other priorities.

### Building the application

To build the application you can run this command:

```bash
$ yarn build
```

This builds the application with the default create react app settings. This means it will include hashing of output files and it will automatically split the code into multiple files.

If you wish to overwrite these settings then change the ./scripts/build.js file to match what you wish to use and then run this command:

```bash
$ yarn build-custom
```

## Contributing to the template

If you would like to contribute to this template then please open a pull request on Github for it to be reviewed.

## Tests

This application uses cypress integration tests. 

This command will start the localhost server and then run the tests:

```bash
yarn run test
```

If the local server is already running, you can run the tests with this command:
```bash
yarn run test:integration:run
```

You can also open the cypress test runner by running this command:
```bash
yarn run test:integration:open
```

## Feedback

If you do make use of this template, or investigate and identify that it's not appropraite, then please get in touch with the DS team to let us know so we can improve any future projects.

## Licence

Copyright 2021 Sage Group plc, all rights reserved. 

Available for use by any product or team within Sage Group plc.