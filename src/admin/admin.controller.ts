import {
  Controller,
  Get,
  UseGuards,
  Request,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserProfileDto } from '../dto/UserProfile.dto';
import { AdminService } from './admin.service';
import { CommentDto } from '../dto/Comment.dto';
import { JwtAuthGuard } from '../authentication/strategy/jwt-auth.guard';
import { RoleGuard } from '../authentication/strategy/role.guard';
import { UserRole } from '../enum/UserRole.enum';
import { Role } from '../authentication/strategy/role.decorator';
import { ClearDatabaseResultDto } from '../dto/ClearDatabaseResult.dto';

@Controller('api/admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Retourne tous les utilisateurs',
  })
  @ApiCreatedResponse({
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => UserProfileDto',
    type: [UserProfileDto],
  })
  public async getAllUsers(@Request() req): Promise<UserProfileDto[]> {
    return this.adminService.findAllUsers();
  }

  @Get('comments')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Retourne tous les commentaires',
  })
  @ApiCreatedResponse({
    type: [CommentDto],
  })
  public async findAllComments(@Request() req): Promise<CommentDto[]> {
    return this.adminService.findAllComments();
  }

  @Put('user/:id')
  @ApiParam({
    name: 'id',
    description: "id de l' utilisateur",
  })
  @ApiCreatedResponse({
    type: [UserProfileDto],
    description: 'Retourne la liste de tous les utilisateurs',
  })
  @ApiOperation({
    summary: "Desactive l'utilisateur",
  })
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiSecurity('JWT-Auth')
  public async disableUser(
    @Request() req,
    @Param('id') id: number,
  ): Promise<UserProfileDto[]> {
    return this.adminService.disableUser(id);
  }

  @Put('comment/:id')
  @ApiParam({
    name: 'id',
    description: 'id du commentaire',
  })
  @ApiCreatedResponse({
    type: [CommentDto],
    description: 'Retourne la liste de tous les commentaires',
  })
  @ApiOperation({
    summary: 'Desactive le commentaire',
  })
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiSecurity('JWT-Auth')
  public async disableComment(
    @Request() req,
    @Param('id') id: number,
  ): Promise<CommentDto[]> {
    return this.adminService.disableComment(id);
  }

  @Delete('database')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiSecurity('JWT-Auth')
  @ApiOperation({
    summary: 'Nettoyage de la base de donnée',
    description:
      'Vide les entre de la base de donnee (utilisateur/like/comment) qui sont en status inactif',
  })
  @ApiCreatedResponse({
    type: ClearDatabaseResultDto,
  })
  public async clearDatabase(@Request() req): Promise<ClearDatabaseResultDto> {
    return this.adminService.clearDatabase();
  }
}
