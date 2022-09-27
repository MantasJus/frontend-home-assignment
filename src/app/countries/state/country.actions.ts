import { createAction, props } from '@ngrx/store';
import { Country } from '../country';

export const loadCountries = createAction(
    '[Country] Load Countries'
);

export const loadCountriesSuccess = createAction(
    '[Country] Load Countries Success',
    props<{ countries: Country[] }>()
);

export const loadCountriesFailure = createAction(
    '[Country] Load Countries Fail',
    props<{ error: string }>()
);

export const filterCountries = createAction(
    '[Country] Filter Countries By Region And Search',
    props<{ search: string , region: string}>()
);

export const loadRegions = createAction(
    '[Country] Load Regions'
);

export const loadRegionsSuccess = createAction(
    '[Country] Load Regions Success',
    props<{ regions: string[] }>()
);

export const loadRegionsFailure = createAction(
    '[Country] Load Regions Fail',
    props<{ error: string }>()
);