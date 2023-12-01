import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserProfileDto } from '../dto/UserProfile.dto';
import { CommentService } from '../tutorial/comment/comment.service';
import { CommentDto } from '../dto/Comment.dto';
import { ClearDatabaseResultDto } from '../dto/ClearDatabaseResult.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  public async findAllUsers(): Promise<UserProfileDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        isActive: user.isActive,
        role: user.role,
      };
    });
  }

  public async findAllComments(): Promise<CommentDto[]> {
    const comments = await this.commentService.findAll();
    return comments.map((comment) => {
      return {
        id: comment.id,
        tutorialId: comment.tutorialId,
        isActive: comment.isActive,
        author: comment.author,
        createdAt: comment.createdAt,
        comment: comment.comment,
      };
    });
  }

  public async disableUser(id: number): Promise<UserProfileDto[]> {
    await this.userService.disableUser(id);
    return this.findAllUsers();
  }

  public async disableComment(id: number): Promise<CommentDto[]> {
    await this.commentService.deleteCommentByAdmin(id);
    return this.findAllComments();
  }

  public async clearDatabase(): Promise<ClearDatabaseResultDto> {
    await this.commentService.clearInactiveComments();
    await this.userService.clearInactiveUser();
    return {
      users: await this.findAllUsers(),
      comments: await this.findAllComments(),
    };
  }
}
