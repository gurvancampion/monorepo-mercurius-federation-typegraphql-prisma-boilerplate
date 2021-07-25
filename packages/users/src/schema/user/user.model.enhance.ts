import { Directive } from 'type-graphql'

import { ModelsEnhanceMap } from '../@generated/type-graphql'

export const userModelEnhance: ModelsEnhanceMap = {
  User: {
    class: [Directive(`@key(fields: "id")`)],
  },
}
