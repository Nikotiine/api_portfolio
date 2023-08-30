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
import { DeleteConfirmationDto } from '../../dto/DeleteConfirmation.dto';

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
  @ApiOperation({
    summary: 'Retourne les commentaires',
    description: 'Renvoie tous les commentaires actif des tutoriels',
  })
  public async findCommentForTutorial(): Promise<CommentDto[]> {
    return this.commentService.findAll();
  }

  @Delete('tutorial/:id')
  @ApiCreatedResponse({
    type: DeleteConfirmationDto,
    description:
      "Message de confirmation de suppersion de l'objet. Pour plus de detail DTO => DeleteConfirmationDto",
  })
  @ApiParam({
    name: 'id',
    description: 'Id du commentaire de tutoriel a supprimer',
  })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-Auth')
  public async deleteComment(
    @Request() req,
    @Param('id') id: number,
  ): Promise<DeleteConfirmationDto> {
    return this.commentService.delete(req.user.id, id);
  }
}
