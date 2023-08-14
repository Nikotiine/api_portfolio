import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserCredentialsDto } from '../dto/UserCredentials.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { AuthenticationService } from './authentication.service';

@Controller('api/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @ApiBody({
    type: UserCredentialsDto,
    description:
      'The Description for the Post Body. Please look into the DTO UserCredentialDto',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() credential: UserCredentialsDto,
  ): Promise<any> {
    return this.authenticationService.generateToken(req.user);
  }
}
