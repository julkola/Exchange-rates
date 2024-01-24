export default async (toCurrency: string, fromCurrency: string): Promise<number> => {
  const apiKey = "fca_live_SRNJZvijR9phkEjOCsOG1aBcc7av0KxCZtuyGNkl";
  const url = "https://api.freecurrencyapi.com/v1/latest?"
  const params = new URLSearchParams();
  params.append('base_currency', toCurrency);
  params.append('currencies', fromCurrency);
  const response = await fetch(url+params.toString(), {
    headers: {
      apikey: apiKey
    },
    method: "GET"
  })
  const json = await response.json();
  return json.data[fromCurrency];
}