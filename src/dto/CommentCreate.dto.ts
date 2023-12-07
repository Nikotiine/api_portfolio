import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from './UserProfile.dto';

export class CommentCreateDto {
  @ApiProperty({
    example: 1,
  })
  tutorialId: number;

  @ApiProperty({
    type: UserProfileDto,
  })
  author: UserProfileDto;

  @ApiProperty({
    example: 'Merci',
  })
  comment: string;
}
