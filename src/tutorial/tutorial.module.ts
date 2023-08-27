import { Module } from '@nestjs/common';
import { LikeService } from './like/like.service';
import { LikeController } from './like/like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../database/entity/Like.entity';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { Comment } from '../database/entity/Comment.entity';

@Module({
  providers: [LikeService, CommentService],
  controllers: [LikeController, CommentController],
  imports: [TypeOrmModule.forFeature([Like, Comment])],
})
export class TutorialModule {}
