import { CommentCreateDto } from './CommentCreate.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto extends CommentCreateDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;
}
