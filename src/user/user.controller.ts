import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from '../dto/UserRegister.dto';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({
    type: UserRegisterDto,
  })
  public async register(@Body() user: UserRegisterDto): Promise<any> {
    return this.userService.createUser(user);
  }
}
