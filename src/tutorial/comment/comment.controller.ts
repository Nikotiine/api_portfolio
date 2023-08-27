import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CommentDto } from '../../dto/Comment.dto';
import { CommentCreateDto } from '../../dto/CommentCreate.dto';
import { JwtAuthGuard } from '../../authentication/strategy/jwt-auth.guard';
import { CommentService } from './comment.service';

@Controller('api/comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('tutorial')
  @ApiCreatedResponse({
    type: CommentDto,
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => CommentDto',
  })
  @ApiBody({
    type: CommentCreateDto,
    description:
      'Pour voir la connaitre le body merci de regarder dans les DTO => CommentCreateDto',
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async newComment(
    @Body() comment: CommentCreateDto,
  ): Promise<CommentDto> {
    return this.commentService.create(comment);
  }

  @Get('tutorial/:id')
  @ApiCreatedResponse({
    type: [CommentDto],
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => CommentDto',
  })
  public async findCommentForTutorial(): Promise<CommentDto[]> {
    return this.commentService.findAllCommentByTutorial();
  }
}
