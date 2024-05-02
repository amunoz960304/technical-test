import { ApiProperty } from '@nestjs/swagger';
import type { UUID } from 'crypto';
import type { TotalsAccount } from '../transactions.interface';

export class TotalsAccountResponseDto implements TotalsAccount {
  @ApiProperty({ example: 'e5588958-48f2-427c-9300-945207532f5d' })
  accountId: UUID;

  @ApiProperty({ example: 100 })
  incomes: number;

  @ApiProperty({ example: 200 })
  expenses: number;
}
