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

  /**
   * Retourne tous les utilisateurs en bdd actifs ou non
   */
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

  /**
   * Retourne tous les commentaires actifs ou non
   */
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

  /**
   * Desactive l'utilisateur / retourne la liste des utilisateurs
   * @param id de l'utilisateur
   */
  public async disableUser(id: number): Promise<UserProfileDto[]> {
    await this.userService.disableUser(id);
    return this.findAllUsers();
  }

  /**
   * Desactiove le commentaire / retourne la liste des commentaires
   * @param id du commentaire
   */
  public async disableComment(id: number): Promise<CommentDto[]> {
    await this.commentService.deleteCommentByAdmin(id);
    return this.findAllComments();
  }

  /**
   * Nettoye la base de donnee des comentaire et des utilisateur en status inactif
   */
  public async clearDatabase(): Promise<ClearDatabaseResultDto> {
    await this.commentService.clearInactiveComments();
    await this.userService.clearInactiveUser();
    return {
      users: await this.findAllUsers(),
      comments: await this.findAllComments(),
    };
  }
}
