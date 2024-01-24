export interface Data {
  send: string,
  get: string,
  send_amount: number | null,
  get_amount: number | null,
}

export type Currencies = Map<string, {
  "symbol": string,
  "decimal_digits": number,
  "rounding": number,
  "code": string,
}> | null;