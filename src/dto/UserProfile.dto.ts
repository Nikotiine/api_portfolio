import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enum/UserRole.enum';

export class UserProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;
}
