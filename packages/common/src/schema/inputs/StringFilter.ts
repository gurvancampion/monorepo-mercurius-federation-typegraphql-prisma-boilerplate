import { inputObjectType } from 'nexus'

import { QueryMode } from '../enums'
import { NestedStringFilter } from './NestedStringFilter'

export const StringFilter = inputObjectType({
  name: 'StringFilter',
  definition(t) {
    t.string('contains')
    t.string('endsWith')
    t.string('equals')
    t.string('gt')
    t.string('gte')
    t.list.nonNull.string('in')
    t.string('lt')
    t.string('lte')
    t.field('mode', { type: QueryMode })
    t.field('not', { type: NestedStringFilter })
    t.list.nonNull.string('notIn')
    t.string('startsWith')
  },
})
