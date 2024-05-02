export interface TransactionsResult {
  count: number;
  previus: string | null;
  next: string | null;
  results: Transaction[];
}

export interface Transaction {
  id: string;
  account: Account;
  created_at: string;
  category: string;
  subcategory: string;
  merchant: Merchant;
  type: string;
  amount: number;
  status: string;
  balance: number | null;
  currency: string;
  reference: string;
  value_date: string;
  description: string;
  collected_at: string;
  observations: string | null;
  accounting_date: string | null;
  internal_identification: string;
}

export interface Account {
  id: string;
  link: string;
  institution: Institution;
  collected_at: string;
  created_at: string;
  internal_identification: string;
  name: string;
  number: string;
  type: string;
  bank_product_id: string;
  public_identification_name: string;
  public_identification_value: string;
  currency: string;
  balance: {
    current: number;
    available: number;
  };
  loan_data: any;
  credit_data: any;
  last_accessed_at: string | null;
  balance_type: string;
}

interface Institution {
  name: string;
  type: string;
}

export interface Merchant {
  logo: string;
  website: string;
  merchant_name: string;
}

export interface Finances {
  totalIncomes: number;
  totalExpenses: number;
}

export interface FinanceAnalysis extends Finances {
  balance: number;
  healthFinance: HealthyType;
}

export interface TotalsAccount {
  accountId: string;
  incomes: number;
  expenses: number;
}

export interface AmountGroup {
  category: string;
  amount: number;
}

export enum TransactionType {
  INFLOW = 'INFLOW',
  OUTFLOW = 'OUTFLOW',
}

export enum HealthyType {
  HEALTHY = 'Saludable',
  NOT_HEALTHY = 'No Saludable',
}
