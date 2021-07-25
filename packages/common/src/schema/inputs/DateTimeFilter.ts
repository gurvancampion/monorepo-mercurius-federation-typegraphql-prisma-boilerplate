import { inputObjectType } from 'nexus'
import { NestedDateTimeFilter } from './NestedDateTimeFilter'

export const DateTimeFilter = inputObjectType({
  name: 'DateTimeFilter',
  definition(t) {
    t.field('equals', { type: 'DateTime' })
    t.field('gt', { type: 'DateTime' })
    t.field('gte', { type: 'DateTime' })
    t.list.nonNull.field('in', { type: 'DateTime' })
    t.field('lt', { type: 'DateTime' })
    t.field('lte', { type: 'DateTime' })
    t.field('not', { type: NestedDateTimeFilter })
    t.list.nonNull.field('notIn', { type: 'DateTime' })
  },
})
