import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enum/UserRole.enum';

export class UserProfileDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'toto',
  })
  username: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  role: UserRole;

  @ApiProperty({ example: true })
  isActive: boolean;
}
