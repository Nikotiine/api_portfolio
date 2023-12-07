import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialsDto {
  @ApiProperty({
    example: 'toto',
  })
  username: string;

  @ApiProperty({
    example: '*******',
  })
  password: string;
}
