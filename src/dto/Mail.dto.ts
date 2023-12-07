import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
  @ApiProperty({
    example: 'Prenom',
  })
  firstName: string;

  @ApiProperty({
    example: 'Nom',
  })
  lastName: string;

  @ApiProperty({
    example: 'Recrutement',
  })
  object: string;

  @ApiProperty({
    example: 'nom.prenom@email.com',
  })
  email: string;

  @ApiProperty({
    example: 'un message',
  })
  message: string;
}
