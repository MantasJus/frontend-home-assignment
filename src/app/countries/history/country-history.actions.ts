import { createAction, props } from "@ngrx/store";
import { Country, StoredCountryHist } from "../country";

export const loadHistory = createAction(
    '[Country-History] Load'
);

export const loadHistorySuccess = createAction(
    '[Country-History] Load Success',
    props<{ storedCountries: StoredCountryHist[] }>()
);

export const loadHistoryFailure = createAction(
    '[Country-History] Load Fail',
    props<{ error: string }>()
);

export const storeCountryToHistory = createAction (
    '[Country-History] Store Country',
    props<{ country: Country }>()
);

export const storingSuccess = createAction (
    '[Country-History] Storing Country Success',
    props<{ storedCountries: StoredCountryHist[] }>()
);

