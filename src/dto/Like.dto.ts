import { LikeCreateDto } from './LikeCreate.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LikeDto extends LikeCreateDto {
  @ApiProperty()
  id: number;
}
