import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserCredentialsDto } from '../dto/UserCredentials.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { AuthenticationService } from './authentication.service';
import { Token } from '../dto/Token.dto';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { UserProfileDto } from '../dto/UserProfile.dto';

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
    summary: "Point de connexion à l'API",
    description:
      'Une fois la validation du couple username/password faite, retourne un JWT',
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Profil utilisateur',
    description: "Point d'entree pour l'autentification du token",
  })
  @ApiCreatedResponse({
    description:
      "Retourne le profil de l'utilisateur apres validation du token",
    type: UserProfileDto,
  })
  async me(@Request() req): Promise<UserProfileDto> {
    return this.authenticationService.getProfile(parseInt(req.user.id));
  }
}
