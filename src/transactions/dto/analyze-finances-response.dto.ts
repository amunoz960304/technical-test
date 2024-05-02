import { ApiProperty } from '@nestjs/swagger';
import type { FinanceAnalysis, HealthyType } from '../transactions.interface';

export class AnalyzeFinancesResponseDto implements FinanceAnalysis {
  @ApiProperty({ example: 5000 })
  balance: number;

  @ApiProperty({ example: 'Saludable' })
  healthFinance: HealthyType;

  @ApiProperty({ example: 800 })
  totalIncomes: number;

  @ApiProperty({ example: 200 })
  totalExpenses: number;
}
