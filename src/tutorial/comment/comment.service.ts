import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../database/entity/Comment.entity';
import { Repository } from 'typeorm';
import { CommentCreateDto } from '../../dto/CommentCreate.dto';
import { CommentDto } from '../../dto/Comment.dto';
import { DeleteConfirmationDto } from '../../dto/DeleteConfirmation.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  /**
   * Sauvegarde le nouveau commentaire
   * retourne la liste des tous les commentaire qui on le status actifs
   * @param comment Objet commentCreateDto
   */
  public async create(comment: CommentCreateDto): Promise<CommentDto[]> {
    const entity: Comment = this.commentRepository.create(comment);
    const newComment: Comment = await this.commentRepository.save(entity);
    return this.commentRepository.find({
      where: {
        tutorialId: newComment.tutorialId,
        isActive: true,
      },
      relations: {
        author: true,
      },
    });
  }

  /**
   * Retourne tous les commentaires actifs
   */
  public async findAllActives(): Promise<CommentDto[]> {
    const comments: Comment[] = await this.commentRepository.find({
      where: {
        isActive: true,
      },
      relations: {
        author: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
    return comments.map((comment: Comment) => {
      return {
        id: comment.id,
        tutorialId: comment.tutorialId,
        author: comment.author,
        createdAt: comment.createdAt,
        comment: comment.comment,
        isActive: comment.isActive,
      };
    });
  }

  /**
   * Supprime le commentaire et verifie que l'utilisateur est bien l'auteur du commentaire
   * Retroune la liste des commentaires qui ont un status actifs
   * @param userId id de l'auteur du commentaire
   * @param id id du commentaire a supprimer
   */
  public async delete(userId: number, id: number): Promise<CommentDto[]> {
    const comment: Comment = await this.findById(id);
    if (comment.author.id !== userId) {
      throw new UnauthorizedException('004');
    }
    comment.isActive = false;
    const deleted: Comment = await this.commentRepository.save(comment);
    if (deleted) {
      return this.commentRepository.find({
        where: {
          tutorialId: deleted.tutorialId,
          isActive: true,
        },
        relations: {
          author: true,
        },
      });
    } else {
      throw new UnauthorizedException('004');
    }
  }

  // Retrourne le commentaire avec son id
  private async findById(id: number): Promise<Comment> {
    return this.commentRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        author: true,
      },
    });
  }

  /**
   * Retourne tous les commentaires / reserver a l'admin
   */
  public async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: {
        author: true,
      },
    });
  }

  /**
   * Permet à l'admin de supprimer n'importe quel commentaire
   * @param id du commentaire
   */
  async deleteCommentByAdmin(id: number): Promise<DeleteConfirmationDto> {
    const comment = await this.commentRepository.findOne({ where: { id: id } });
    comment.isActive = false;
    const deleted = await this.commentRepository.save(comment);
    return {
      id: deleted.id,
      deleted: true,
      object: 'Comment',
    };
  }
}
