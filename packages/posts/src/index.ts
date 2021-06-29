import Fastify from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
import { IS_DEV } from 'common'

export const app = Fastify({
  logger: IS_DEV,
})

const posts = {
  p1: {
    pid: 'p1',
    title: 'Post 1',
    content: 'Content 1',
    authorId: 'u1',
  },
  p2: {
    pid: 'p2',
    title: 'Post 2',
    content: 'Content 2',
    authorId: 'u2',
  },
  p3: {
    pid: 'p3',
    title: 'Post 3',
    content: 'Content 3',
    authorId: 'u1',
  },
  p4: {
    pid: 'p4',
    title: 'Post 4',
    content: 'Content 4',
    authorId: 'u2',
  },
}

const schema = `
  type Post @key(fields: "pid") {
    pid: ID!
    title: String
    content: String
    author: User @requires(fields: "pid title")
  }
  type Query @extends {
    topPosts(count: Int): [Post]
  }
  type User @key(fields: "id") @extends {
    id: ID! @external
    name: String @external
    posts: [Post]
    numberOfPosts: Int @requires(fields: "id name")
  }
  extend type Mutation {
    createPost(post: PostInput!): Post
    updateHello: String
  }
  input PostInput {
    title: String!
    content: String!
    authorId: String!
  }
`

const resolvers = {
  Post: {
    __resolveReference: (post, args, context, info) => {
      return posts[post.pid]
    },
    author: (post, args, context, info) => {
      return {
        __typename: 'User',
        id: post.authorId,
      }
    },
  },
  User: {
    posts: (user, args, context, info) => {
      return Object.values(posts).filter((p) => p.authorId === user.id)
    },
    numberOfPosts: (user) => {
      return Object.values(posts).filter((p) => p.authorId === user.id).length
    },
  },
  Query: {
    topPosts: (root, { count = 2 }) => Object.values(posts).slice(0, count),
  },
  Mutation: {
    createPost: (root, { post }) => {
      const pid = `p${Object.values(posts).length + 1}`

      const result = {
        pid,
        ...post,
      }
      posts[pid] = result

      return result
    },
    updateHello: () => 'World',
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

app.listen(4002)
