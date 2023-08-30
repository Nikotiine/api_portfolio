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
   * @param comment Objet commentCreateDto
   */
  public async create(comment: CommentCreateDto): Promise<CommentDto> {
    const entity: Comment = this.commentRepository.create(comment);
    const newComment: Comment = await this.commentRepository.save(entity);
    return {
      id: newComment.id,
      tutorialId: newComment.tutorialId,
      comment: newComment.comment,
      createdAt: newComment.createdAt,
      author: newComment.author,
    };
  }

  /**
   * Retourne tous le commentaires actifs
   */
  public async findAll(): Promise<CommentDto[]> {
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
      };
    });
  }

  /**
   * Supprime le commentaire
   * @param userId id de l'auteur du commentaire
   * @param id id du commentaire a supprimer
   */
  public async delete(
    userId: number,
    id: number,
  ): Promise<DeleteConfirmationDto> {
    const comment: Comment = await this.findById(id);
    if (comment.author.id !== userId) {
      throw new UnauthorizedException('004');
    }
    comment.isActive = false;
    const deleted: Comment = await this.commentRepository.save(comment);
    return {
      id: deleted.id,
      deleted: !deleted.isActive,
      object: 'Comment',
    };
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
}
