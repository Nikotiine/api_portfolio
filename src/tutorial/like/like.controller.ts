import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { LikeCreateDto } from '../../dto/LikeCreate.dto';
import { LikeDto } from '../../dto/Like.dto';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../../authentication/strategy/jwt-auth.guard';

@Controller('api/like')
@ApiTags('Like')
export class LikeController {
  constructor(private likeService: LikeService) {}
  @Post('tutorial')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  @ApiBody({
    type: LikeCreateDto,
  })
  @ApiOperation({
    summary: "Post d'un like",
    description: "Mettre ou supprimer un like d'un tutorial",
  })
  @ApiCreatedResponse({
    type: [LikeDto],
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => LikeDto',
  })
  public async likeTutorial(@Body() like: LikeCreateDto): Promise<LikeDto[]> {
    return this.likeService.create(like);
  }

  @Get('tutorials')
  @ApiOperation({
    summary: 'Get all  des likes',
    description: 'Recupere en bdd tout les likes actifs des tutoriels',
  })
  @ApiCreatedResponse({
    type: [LikeDto],
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => LikeDto',
  })
  public async getAllLikesOfTutorials(): Promise<LikeDto[]> {
    return this.likeService.findAllLikesOfTutorials();
  }

  @Get('tutorial/:id')
  @ApiOperation({
    summary: 'Renvoie les like par tuto',
  })
  @ApiCreatedResponse({
    type: [LikeDto],
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => LikeDto',
  })
  @ApiParam({
    name: 'id',
    description: 'Id du tuto',
  })
  public async getLikeByTutorial(@Param('id') id: number): Promise<LikeDto[]> {
    return this.likeService.findByTutorial(id);
  }
}
