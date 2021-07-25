import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import { Post } from '../@generated/type-graphql'
import { Context } from '../../context'
import User from '../user/user.model'

@Resolver((of) => Post)
export class PostUserResolver {
  @FieldResolver((type) => Post, { nullable: true })
  async user(@Root() post: Post): Promise<User | null> {
    console.log('resolve')
    return {
      __typename: 'User',
      id: post.userId,
    }
  }
}
