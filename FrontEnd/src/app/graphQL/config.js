const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://localhost:8000/graphql',
});

export default fetch;