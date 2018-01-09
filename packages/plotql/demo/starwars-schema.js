const data = require('./fixture');

const types = [
  `
type Query {
  starwars: [Character]
}

type Character {
  name: String!
  birthYear: String
}`
];

const resolvers = {
  Query: {
    starwars: () =>
      data.results.map(({ name, birth_year }) => ({
        name,
        birthYear: birth_year
      }))
  }
};

module.exports = {
  types,
  resolvers
};
