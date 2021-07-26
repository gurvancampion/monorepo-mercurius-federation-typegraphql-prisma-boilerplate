import { buildFederatedSchema } from 'common'

import {
  applyModelsEnhanceMap,
  resolvers,
  User,
} from './@generated/type-graphql'
import { userModelEnhance, resolveUserReference } from './user'

applyModelsEnhanceMap({
  ...userModelEnhance,
})

export default buildFederatedSchema(
  {
    resolvers,
    orphanedTypes: [User],
    validate: false,
    emitSchemaFile: __dirname + '/../../schema.graphql',
  },
  {
    // @ts-ignore
    User: { __resolveReference: resolveUserReference },
  },
)
