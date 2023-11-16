import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enum/UserRole.enum';

export class UserProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  isActive: boolean;
}
