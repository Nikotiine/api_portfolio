import { Injectable } from '@nestjs/common';
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

  /**
   * Sauvegarde le like emis par l'utlisateur connecter
   * Si le like est deja existant en bdd, change son attribut isActive (bolleen) sur le stauts opoposé
   * @param like le like emis sous forme de LikeCreateDto
   */
  public async create(like: LikeCreateDto): Promise<LikeDto> {
    const isExist: Like = await this.likeRepository.findOneBy({
      tutorialId: like.tutorialId,
      user: {
        id: like.user.id,
      },
    });
    let created: Like = null;
    if (isExist) {
      isExist.isActive = !isExist.isActive;
      created = await this.likeRepository.save(isExist);
    } else {
      const newEntity: Like = this.likeRepository.create(like);
      created = await this.likeRepository.save(newEntity);
    }

    return {
      id: created.id,
      tutorialId: created.tutorialId,
      user: created.user,
    };
  }

  /**
   * Retourne tous les likes actifs pour tout les tutoriels
   */
  public async findAllLikesOfTutorials(): Promise<LikeDto[]> {
    const likes: LikeDto[] = await this.likeRepository.find({
      where: {
        isActive: true,
      },
      relations: {
        user: true,
      },
    });
    return likes.map((like) => {
      return {
        id: like.id,
        tutorialId: like.tutorialId,
        user: like.user,
      };
    });
  }
}
