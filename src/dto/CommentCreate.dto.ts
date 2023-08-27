import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from './UserProfile.dto';

export class CommentCreateDto {
  @ApiProperty()
  tutorialId: number;

  @ApiProperty({
    type: UserProfileDto,
  })
  author: UserProfileDto;

  @ApiProperty()
  comment: string;
}
