import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from './UserProfile.dto';

export class LikeCreateDto {
  @ApiProperty({
    example: 1,
  })
  tutorialId: number;
  @ApiProperty()
  user: UserProfileDto;
  @ApiProperty({ example: true })
  isActive: boolean;
}
