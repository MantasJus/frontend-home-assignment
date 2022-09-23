// Entire app state

import { CountryState } from "../countries/state/country.reducer";

export interface State {
  user: CountryState;
}