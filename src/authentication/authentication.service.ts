import { BadRequestException, Injectable } from '@nestjs/common';
import * as process from 'process';
import { User } from '../database/entity/User.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthenticationService {
  private salt: number;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.salt = parseInt(process.env.BCRYPT_SALT);
  }
  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Credentials');
    }

    return user;
  }
  public async generateToken(user: User): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async getProfile(id: number): Promise<any> {
    return this.userService.findById(id);
  }
}
