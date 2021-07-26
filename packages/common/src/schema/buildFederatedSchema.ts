import { specifiedDirectives } from 'graphql'
import federationDirectives from '@apollo/federation/dist/directives'
import gql from 'graphql-tag'
import {
  printSchema,
  buildFederatedSchema as buildApolloFederationSchema,
} from '@apollo/federation'
import { addResolversToSchema, GraphQLResolverMap } from 'apollo-graphql'
import {
  buildSchema,
  BuildSchemaOptions,
  createResolversMap,
} from 'type-graphql'
import * as fs from 'fs'

export async function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, 'skipCheck'>,
  referenceResolvers?: GraphQLResolverMap<any>,
) {
  const schema = await buildSchema({
    ...options,
    directives: [
      ...specifiedDirectives,
      ...federationDirectives,
      ...(options.directives || []),
    ],
    skipCheck: true,
  })

  // workaround https://github.com/mercurius-js/mercurius/issues/273
  const schemaString = printSchema(schema)
    .replace('type Query {', 'type Query @extends {')
    .replace('type Mutation {', 'type Mutation @extends {')
    .replace('type Subscription {', 'type Subscription @extends {')

  const federatedSchema = buildApolloFederationSchema({
    typeDefs: gql(schemaString),
    resolvers: createResolversMap(schema) as any,
  })

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers)
  }

  // Print federated schema
  if (options.emitSchemaFile) {
    fs.writeFileSync(
      options.emitSchemaFile as string,
      printSchema(federatedSchema),
    )
  }

  return federatedSchema
}
