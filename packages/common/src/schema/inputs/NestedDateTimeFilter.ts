import { inputObjectType } from 'nexus'

export const NestedDateTimeFilter = inputObjectType({
  name: 'NestedDateTimeFilter',
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
