import { CommentCreateDto } from './CommentCreate.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto extends CommentCreateDto {
  @ApiProperty({
    example: 0,
  })
  id: number;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty()
  isActive: boolean;
}
