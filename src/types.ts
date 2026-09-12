export interface Currency {
  code: string;
  name: string;
  flag: string;
  symbol: string;
}

export interface ConverterState {
  amount: number;
  from: string; // currency code
  to: string; // currency code
}
