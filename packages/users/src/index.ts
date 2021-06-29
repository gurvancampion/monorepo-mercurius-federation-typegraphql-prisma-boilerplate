import Fastify from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
import { IS_DEV } from 'common'

export const app = Fastify({
  logger: IS_DEV,
})

const users = {
  u1: {
    id: 'u1',
    name: 'John',
  },
  u2: {
    id: 'u2',
    name: 'Jane',
  },
  u3: {
    id: 'u3',
    name: 'Jack',
  },
}

const schema = `
  extend type Query {
    me: User
    you: User
    hello: String
  }
  type User @key(fields: "id") {
    id: ID!
    name: String!
    fullName: String
    avatar(size: AvatarSize): String
    friends: [User]
  }
  enum AvatarSize {
    small
    medium
    large
  }
`

const resolvers = {
  Query: {
    me: (root, args, context, info) => {
      return users.u1
    },
    you: (root, args, context, info) => {
      throw new mercurius.ErrorWithProps("Can't fetch other users data", {
        code: 'NOT_ALLOWED',
      })
    },
    hello: () => 'world',
  },
  User: {
    __resolveReference: (user, args, context, info) => {
      return users[user.id]
    },
    avatar: (user, { size }) => `avatar-${size}.jpg`,
    friends: (user) => Object.values(users).filter((u) => u.id !== user.id),
    fullName: (user) => user.name + ' Doe',
  },
}

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: false,
  ide: false,
  federationMetadata: true,
})

app.register(AltairFastify, {
  path: '/altair',
  baseURL: '/altair/',
  // 'endpointURL' should be the same as the mercurius 'path'
  endpointURL: '/graphql',
})

app.listen(4001)
