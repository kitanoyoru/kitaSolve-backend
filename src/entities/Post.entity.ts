import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User.entity'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  headline: string

  @Column()
  content: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_) => User, { nullable: false, onDelete: 'RESTRICT' })
  @Exclude()
  author: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
