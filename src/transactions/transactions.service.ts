import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import type { AxiosRequestConfig } from 'axios';
import type { UUID } from 'crypto';
import {
  HealthyType,
  TransactionType,
  Transaction,
  TransactionsResult,
  Finances,
  FinanceAnalysis,
  type TotalsAccount,
  type AmountGroup,
} from './transactions.interface';

@Injectable()
export class TransactionsService {
  private readonly user: string = process.env.BELVO_SECRET_ID;
  private readonly password: string = process.env.BELVO_SECRET_PWD;
  private readonly encodedAuth: string;
  private readonly headers: object;
  private readonly config: AxiosRequestConfig;

  constructor(private readonly httpService: HttpService) {
    this.encodedAuth = btoa(`${this.user}:${this.password}`);
    this.headers = {
      Authorization: `Basic ${this.encodedAuth}`,
    };

    this.config = {
      headers: this.headers,
    };
  }

  async getTransactionsByLinkId(
    linkId: UUID,
    pageSize?: string,
  ): Promise<TransactionsResult> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `/api/transactions/?page_size=${pageSize}&link=${linkId}`,
        this.config,
      );

      if (data.count === 0) {
        throw new NotFoundException(
          `No se encontraron transacciones con el id: ${linkId}`,
        );
      }

      return data;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error?.response?.data ?? error?.message,
        error?.response?.status ?? error?.status,
      );
    }
  }

  groupAmounts(transactions: Transaction[]): AmountGroup[] {
    return transactions.reduce(
      (totals: AmountGroup[], transaction: Transaction) => {
        const { category, amount } = transaction;

        const index = totals.findIndex((item) => item.category === category);
        if (index === -1) {
          totals.push({ category, amount });
        } else {
          totals[index].amount += amount;
        }

        return totals;
      },
      [],
    );
  }

  analyzeFinances(transactions: Transaction[]): FinanceAnalysis {
    const { OUTFLOW, INFLOW } = TransactionType;
    const { HEALTHY, NOT_HEALTHY } = HealthyType;
    const { totalIncomes, totalExpenses } = transactions.reduce(
      (accumulator: Finances, transaction: Transaction) => {
        const { type, amount } = transaction;
        if (type === INFLOW) {
          accumulator.totalIncomes += amount;
        } else if (type === OUTFLOW) {
          accumulator.totalExpenses += amount;
        }
        return accumulator;
      },
      { totalIncomes: 0, totalExpenses: 0 },
    );

    const balance = totalIncomes - totalExpenses;
    const healthFinance = balance >= 0 ? HEALTHY : NOT_HEALTHY;

    return {
      totalIncomes,
      totalExpenses,
      balance,
      healthFinance,
    };
  }

  totalsAccount(transactions: Transaction[]): TotalsAccount[] {
    const { OUTFLOW, INFLOW } = TransactionType;
    return transactions.reduce(
      (totals: TotalsAccount[], transaction: Transaction) => {
        const {
          account: { id },
          type,
          amount,
        } = transaction;

        const existingAccount = totals.find(
          (account) => account.accountId === id,
        );

        if (!existingAccount) {
          totals.push({
            accountId: id,
            incomes: type === INFLOW ? amount : 0,
            expenses: type === OUTFLOW ? amount : 0,
          });
        } else {
          if (type === INFLOW) {
            existingAccount.incomes += amount;
          } else if (type === OUTFLOW) {
            existingAccount.expenses += amount;
          }
        }

        return totals;
      },
      [],
    );
  }
}
