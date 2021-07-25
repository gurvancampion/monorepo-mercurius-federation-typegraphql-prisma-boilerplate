import { buildFederatedSchema } from 'common'

import {
  applyModelsEnhanceMap,
  resolvers,
  Post,
} from './@generated/type-graphql'
import { postModelEnhance, resolvePostReference } from './post'
import User from './user/user.model'

applyModelsEnhanceMap({
  ...postModelEnhance,
})

export default buildFederatedSchema(
  {
    resolvers: [User, ...resolvers],
    orphanedTypes: [Post],
    validate: false,
    emitSchemaFile: __dirname + '/../../schema.graphql',
  },
  {
    Post: { __resolveReference: resolvePostReference },
  },
)
