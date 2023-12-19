import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
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
    type: [CommentDto],
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => CommentDto',
  })
  @ApiBody({
    type: CommentCreateDto,
    description:
      'Pour voir la connaitre le body merci de regarder dans les DTO => CommentCreateDto',
  })
  @ApiOperation({
    summary: "Post d'un commentaire",
    description:
      'Ajoute un nouveau commentaire au tutoriel concerne (id du tuto passé dans le body)',
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async newComment(
    @Body() comment: CommentCreateDto,
  ): Promise<CommentDto[]> {
    return this.commentService.create(comment);
  }

  @Get('tutorials')
  @ApiCreatedResponse({
    type: [CommentDto],
    description:
      'Pour voir la description de la reponse merci de regarder dans les DTO => CommentDto',
  })
  @ApiOperation({
    summary: 'Get_All des commentaires',
    description: 'Renvoie tous les commentaires actif des tutoriels',
  })
  public async getAllCommentsOfTutorial(): Promise<CommentDto[]> {
    return this.commentService.findAllActives();
  }

  @Delete('tutorial/:id')
  @ApiCreatedResponse({
    type: [CommentDto],
    description: 'Retourne la liste de tous les commentaire en status actif',
  })
  @ApiParam({
    name: 'id',
    description: 'Id du commentaire de tutoriel à supprimer',
  })
  @ApiOperation({
    summary: 'Supression du commentaire',
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async deleteComment(
    @Request() req,
    @Param('id') id: number,
  ): Promise<CommentDto[]> {
    return this.commentService.delete(req.user.id, id);
  }
}
