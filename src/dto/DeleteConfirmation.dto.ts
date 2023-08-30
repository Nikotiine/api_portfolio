import { ApiProperty } from '@nestjs/swagger';

export class DeleteConfirmationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  object: string;
}
