import * as bcrypt from 'bcrypt'

import { Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  @IsNotEmpty()
  username: string

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data)
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, this.password)
  }
}
