import { ApiProperty } from '@nestjs/swagger';
import { UserProfileDto } from './UserProfile.dto';

export class LikeCreateDto {
  @ApiProperty()
  tutorialId: number;
  @ApiProperty()
  user: UserProfileDto;
  @ApiProperty()
  isActive: boolean;
}
