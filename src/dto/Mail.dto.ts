import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  object: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  message: string;
}
