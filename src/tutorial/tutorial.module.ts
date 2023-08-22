import { Module } from '@nestjs/common';
import { LikeService } from './like/like.service';
import { LikeController } from './like/like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../database/entity/Like.entity';

@Module({
  providers: [LikeService],
  controllers: [LikeController],
  imports: [TypeOrmModule.forFeature([Like])],
})
export class TutorialModule {}
