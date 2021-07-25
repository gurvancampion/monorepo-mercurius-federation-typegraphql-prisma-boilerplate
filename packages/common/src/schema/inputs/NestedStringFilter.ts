import { inputObjectType } from 'nexus'

export const NestedStringFilter = inputObjectType({
  name: 'NestedStringFilter',
  definition(t) {
    t.string('contains')
    t.string('endsWith')
    t.string('equals')
    t.string('gt')
    t.string('gte')
    t.list.nonNull.string('in')
    t.string('lt')
    t.string('lte')
    t.field('not', { type: NestedStringFilter })
    t.list.nonNull.string('notIn')
    t.string('startsWith')
  },
})
