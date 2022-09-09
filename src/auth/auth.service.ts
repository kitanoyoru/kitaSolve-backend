import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/entities/User.entity'
import { JwtPayload } from './types/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyJWT(payload: JwtPayload): Promise<User> {
    let user: User

    try {
      user = this.userService.findOne({ where: { email: payload.sub } })
    } catch (err) {
      throw new NotFoundException()
    }

    return user
  }

  async login(email: string, password: string): Promise<User> {
    let user: User

    try {
      user = this.userService.findOne({ where: { email } })
    } catch (err) {
      throw new NotFoundException(`
        User with email: ${email} does not exists.
      `)
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException()
    }

    return user
  }
}
