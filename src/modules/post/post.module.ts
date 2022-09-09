import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Post } from 'src/entities/Post.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostModule {}
