import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LikeCreateDto } from '../../dto/LikeCreate.dto';
import { LikeDto } from '../../dto/Like.dto';
import { LikeService } from './like.service';

@Controller('api/like')
@ApiTags('Like')
export class LikeController {
  constructor(private likeService: LikeService) {}
  @Post('tutorial')
  @ApiBody({
    type: LikeCreateDto,
  })
  @ApiOperation({
    summary: 'Envoyer un like pour un tutorial',
  })
  @ApiCreatedResponse({
    type: LikeDto,
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => LikeDto',
  })
  public async giveLikeForTutorial(
    @Body() like: LikeCreateDto,
  ): Promise<LikeDto> {
    return this.likeService.likeTutorial(like);
  }
}
