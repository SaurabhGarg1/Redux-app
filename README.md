## About

This application is about displaying data about the customer of a bank in a tabular format. You can search data by description and sort by start date.

This application uses redux for state management and redux-observable as a middleware

## Development
You need `npm` or `yarn` installed in the system in order to run this.

### Setup
```
npm install
npm start
``` 
### Test
You can run component unit tests by running
```
npm test
```

### Functional test
Functional tests are written using [testcafe](https://devexpress.github.io/testcafe/). You need to start the application with `npm start` before executing test. Tests can be then executed using

```
npm run functional-test
```