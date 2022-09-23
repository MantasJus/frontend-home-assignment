import { createAction, props } from '@ngrx/store';
import { Country } from '../country';

export const loadCountries = createAction(
    '[Country] Load'
);

export const loadCountriesSuccess = createAction(
    '[Country] Load Success',
    props<{ countries: Country[] }>()
);

export const loadCountriesFailure = createAction(
    '[Country] Load Fail',
    props<{ error: string }>()
);