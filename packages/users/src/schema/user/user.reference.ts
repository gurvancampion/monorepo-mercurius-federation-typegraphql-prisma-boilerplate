import { User } from '../@generated/type-graphql'
import { Context } from '../../context'

export async function resolveUserReference(
  reference: Pick<User, 'id'>,
  { prisma }: Context,
): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id: reference.id },
  })
}
