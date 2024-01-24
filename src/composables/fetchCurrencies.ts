import { Currencies } from "../types";

export default async (): Promise<Currencies> => {
    const apiKey = "fca_live_SRNJZvijR9phkEjOCsOG1aBcc7av0KxCZtuyGNkl";
    const url = "https://api.freecurrencyapi.com/v1/currencies?currencies=AUD,CAD,CNY,EUR,GBP,INR,MYR,USD"
    const response = await fetch(url, {
        headers: {
            apikey: apiKey,
        },
        method: "GET"
    })
    const json = await response.json();
    const map = new Map(Object.entries(json.data)) as Currencies;
    return map;
}