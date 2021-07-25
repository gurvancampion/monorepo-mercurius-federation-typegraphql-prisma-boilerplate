import { enumType } from 'nexus'

export const QueryMode = enumType({
  name: 'QueryMode',
  members: ['default', 'insensitive'],
})
