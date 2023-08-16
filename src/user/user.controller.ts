import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserRegisterDto } from '../dto/UserRegister.dto';
import { UserProfileDto } from '../dto/UserProfile.dto';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({
    type: UserRegisterDto,
    description:
      'Pour voir la description du body merci de regarder dabns les DTO => UserRegisterDto',
  })
  @ApiCreatedResponse({
    type: UserProfileDto,
    description:
      'Pour voir la description de la reponse merci de regarder dabns les DTO => UserProfileDto',
  })
  @ApiOperation({
    summary: "Point d'entrée pour creer un nouvel utilisateur",
  })
  public async register(
    @Body() user: UserRegisterDto,
  ): Promise<UserProfileDto> {
    return this.userService.createUser(user);
  }
}
