import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { UUID } from 'crypto';
import { TransactionsService } from './transactions.service';
import {
  type TotalsAccount,
  type AmountGroup,
  type FinanceAnalysis,
} from './transactions.interface';
import { TotalsAccountResponseDto } from './dto/totals-account-response.dto';
import { AnalyzeFinancesResponseDto } from './dto/analyze-finances-response.dto';
import { GroupAmountsResponseDto } from './dto/group-amounts-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/group-amounts/:linkId/:page_size?')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Agrupa montos de transacciones por categoria',
  })
  @ApiParam({
    name: 'linkId',
    description: 'Link id para identificar la transacciónes',
  })
  @ApiParam({
    name: 'page_size',
    description: 'Tamaño de la página para la paginación, valor por defecto 50',
    required: false,
  })
  @ApiResponse({
    status: 200,
    type: GroupAmountsResponseDto,
    isArray: true,
  })
  async groupAmounts(
    @Param('linkId') linkId: UUID,
    @Param('page_size') pageSize?: string,
  ): Promise<AmountGroup[]> {
    const { results } = await this.transactionsService.getTransactionsByLinkId(
      linkId,
      pageSize,
    );
    return this.transactionsService.groupAmounts(results);
  }

  @Get('/analyze-finances/:linkId/:page_size?')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Realiza un analisis financiero',
  })
  @ApiParam({
    name: 'linkId',
    description: 'Link id para identificar la transacciónes',
  })
  @ApiParam({
    name: 'page_size',
    description: 'Tamaño de la página para la paginación, valor por defecto 50',
    required: false,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: AnalyzeFinancesResponseDto,
  })
  async analyzeFinances(
    @Param('linkId') linkId: UUID,
    @Param('page_size') pageSize?: string,
  ): Promise<FinanceAnalysis> {
    const { results } = await this.transactionsService.getTransactionsByLinkId(
      linkId,
      pageSize,
    );
    return this.transactionsService.analyzeFinances(results);
  }

  @Get('/totals-account/:linkId/:page_size?')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Realiza la suma de ingresos y egresos por cuenta',
  })
  @ApiParam({
    name: 'linkId',
    description: 'Link id para identificar la transacciónes',
  })
  @ApiParam({
    name: 'page_size',
    description: 'Tamaño de la página para la paginación, valor por defecto 50',
    required: false,
  })
  @ApiResponse({
    status: 200,
    type: TotalsAccountResponseDto,
    isArray: true,
  })
  async totalsAccount(
    @Param('linkId') linkId: UUID,
    @Param('page_size') pageSize: string = '50',
  ): Promise<TotalsAccount[]> {
    const { results } = await this.transactionsService.getTransactionsByLinkId(
      linkId,
      pageSize,
    );

    return this.transactionsService.totalsAccount(results);
  }
}
