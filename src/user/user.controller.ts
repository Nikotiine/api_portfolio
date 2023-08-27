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
      'Pour voir la description du body merci de regarder dans les DTO => UserRegisterDto',
  })
  @ApiCreatedResponse({
    type: UserProfileDto,
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => UserProfileDto',
  })
  @ApiOperation({
    summary: "Creation d' un nouvel utilisateur",
    description:
      "La creation d'un nouveau compte utilisateur avec l'objet UserRegisterDto dans le body",
  })
  public async register(
    @Body() user: UserRegisterDto,
  ): Promise<UserProfileDto> {
    return this.userService.createUser(user);
  }
}
