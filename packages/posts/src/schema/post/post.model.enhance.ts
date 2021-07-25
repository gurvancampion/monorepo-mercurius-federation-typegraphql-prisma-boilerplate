import { Directive } from 'type-graphql'

import { ModelsEnhanceMap } from '../@generated/type-graphql'

export const postModelEnhance: ModelsEnhanceMap = {
  Post: {
    class: [Directive(`@key(fields: "id")`)],
  },
}
