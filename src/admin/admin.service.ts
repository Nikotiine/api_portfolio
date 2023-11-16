import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserProfileDto } from '../dto/UserProfile.dto';
import { CommentService } from '../tutorial/comment/comment.service';
import { CommentDto } from '../dto/Comment.dto';
import { DeleteConfirmationDto } from '../dto/DeleteConfirmation.dto';

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

  public async disableUser(id: number): Promise<DeleteConfirmationDto> {
    return await this.userService.disableUser(id);
  }
}
