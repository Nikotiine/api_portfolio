import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../database/entity/Comment.entity';
import { Repository } from 'typeorm';
import { CommentCreateDto } from '../../dto/CommentCreate.dto';
import { CommentDto } from '../../dto/Comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async create(comment: CommentCreateDto): Promise<CommentDto> {
    const entity = this.commentRepository.create(comment);
    const newComment = await this.commentRepository.save(entity);
    return {
      id: newComment.id,
      tutorialId: newComment.tutorialId,
      comment: newComment.comment,
      createdAt: newComment.createdAt,
      author: newComment.author,
    };
  }

  public async findAllCommentByTutorial(): Promise<CommentDto[]> {
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
    return comments.map((comment) => {
      return {
        id: comment.id,
        tutorialId: comment.tutorialId,
        author: comment.author,
        createdAt: comment.createdAt,
        comment: comment.comment,
      };
    });
  }
}
