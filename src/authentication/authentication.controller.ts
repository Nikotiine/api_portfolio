import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserCredentialsDto } from '../dto/UserCredentials.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { AuthenticationService } from './authentication.service';
import { Token } from '../dto/Token.dto';

@Controller('api/authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @ApiBody({
    type: UserCredentialsDto,
    description:
      'Pour la description de body merci de regarder la section DTO => UserCredentialDto',
  })
  @ApiOperation({
    summary: "Point d'access à l'API",
    description:
      "Une fois la validation du couple email/password faite, retourne un token d'access",
  })
  @ApiCreatedResponse({
    type: Token,
    description:
      'Pour la description de la reponse merci de regarder la section DTO => Token',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() credential: UserCredentialsDto,
  ): Promise<Token> {
    return this.authenticationService.generateToken(req.user);
  }
}
