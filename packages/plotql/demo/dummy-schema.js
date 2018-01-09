const documents = [
  {
    id: 1,
    authorId: 1,
    title: 'Introduction to GraphQL',
    votes: 2,
    meta: { one: 1, two: 2 }
  },
  {
    id: 2,
    authorId: 2,
    title: 'Welcome to Apollo',
    votes: 3,
    meta: { one: 1, two: 2 }
  },
  {
    id: 3,
    authorId: 2,
    title: 'Advanced GraphQL',
    votes: 1,
    meta: { one: 1, two: 2 }
  },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', meta: { one: 1, two: 2 } }
];

const types = [
  `
type Query {
  documents: [Doc]
  document(id: Int!): Doc
}

type Doc {
  id: Int!
  title: String
  authorId: Int
  votes: Int
}`
];

const resolvers = {
  Query: {
    documents: () => documents,
    document: (_, { id }) => documents.find(d => (d.id = id))
  }
};

module.exports = {
  types,
  resolvers
};
