import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from '../../database/entity/Like.entity';
import { Repository } from 'typeorm';
import { LikeCreateDto } from '../../dto/LikeCreate.dto';
import { LikeDto } from '../../dto/Like.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
  ) {}

  public async likeTutorial(like: LikeCreateDto): Promise<LikeDto> {
    const isExist = await this.likeRepository.findOne({
      where: {
        tutorialId: like.tutorialId,
        user: like.user,
      },
    });
    if (isExist) {
      throw new BadRequestException('002');
    }
    const entity = this.likeRepository.create(like);
    const created = await this.likeRepository.save(entity);
    return {
      id: created.id,
      tutorialId: created.tutorialId,
      user: created.user,
    };
  }
}