import {
  Controller,
  Get,
  UseGuards,
  Request,
  Put,
  Param,
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
import { DeleteConfirmationDto } from '../dto/DeleteConfirmation.dto';

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
    type: DeleteConfirmationDto,
  })
  @ApiOperation({
    summary: "Active ou desactive l'utilisateur",
  })
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiSecurity('JWT-Auth')
  public async disableUser(
    @Request() req,
    @Param('id') id: number,
  ): Promise<DeleteConfirmationDto> {
    return this.adminService.disableUser(id);
  }
}
