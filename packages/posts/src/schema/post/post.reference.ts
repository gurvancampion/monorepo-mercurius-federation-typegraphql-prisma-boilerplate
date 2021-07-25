import { Post } from '../@generated/type-graphql'
import { Context } from '../../context'

export async function resolvePostReference(
  reference: Pick<Post, 'id'>,
  { prisma }: Context,
): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: { id: reference.id },
  })
}
