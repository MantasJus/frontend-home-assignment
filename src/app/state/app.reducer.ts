import { HistoryState } from "../countries/history/country-history.reducer";
import { CountryState } from "../countries/state/country.reducer";


export interface RootState {
    countries: CountryState;
    countriesHist: HistoryState;
}