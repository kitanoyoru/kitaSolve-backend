import { DataSourceOptions } from 'typeorm'

import { User } from 'src/entities/User.entity'
import { Post } from 'src/entities/Post.entity'

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  entities: [User, Post],
  url: process.env.PORTGRES_URL,
}
