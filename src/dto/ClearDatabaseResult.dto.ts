import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from './UserProfile.dto';
import { CommentDto } from './Comment.dto';

export class ClearDatabaseResultDto {
  @ApiProperty({
    type: [UserProfileDto],
  })
  users: UserProfileDto[];

  @ApiProperty({
    type: [CommentDto],
  })
  comments: CommentDto[];
}
