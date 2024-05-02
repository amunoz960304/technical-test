import { ApiProperty } from '@nestjs/swagger';
import { AmountGroup } from '../transactions.interface';

export class GroupAmountsResponseDto implements AmountGroup {
  @ApiProperty({ example: 'Food' })
  category: string;

  @ApiProperty({ example: 800 })
  amount: number;
}
