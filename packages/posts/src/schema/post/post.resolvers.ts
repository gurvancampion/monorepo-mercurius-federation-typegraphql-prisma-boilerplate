import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import { Post } from '../@generated/type-graphql'
import { Context } from '../../context'
import User from '../user/user.model'

@Resolver((of) => Post)
export class PostUserResolver {
  @FieldResolver((type) => User, { nullable: true })
  async user(@Root() post: Post): Promise<User | null> {
    return {
      // @ts-ignore
      __typename: 'User',
      id: post.userId,
    }
  }
}
