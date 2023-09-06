import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from '../dto/UserProfile.dto';
import { AdminService } from './admin.service';
import { CommentDto } from '../dto/Comment.dto';

@Controller('api/admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({
    summary: 'Retourne tous les utilisateurs',
  })
  @ApiCreatedResponse({
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => UserProfileDto',
    type: [UserProfileDto],
  })
  public async getAllUsers(): Promise<UserProfileDto[]> {
    return this.adminService.findAllUsers();
  }

  @Get('comments')
  @ApiOperation({
    summary: 'Retourne tous les commentaires',
  })
  @ApiCreatedResponse({
    type: [CommentDto],
  })
  public async findAllComments(): Promise<CommentDto[]> {
    return this.adminService.findAllComments();
  }
}
