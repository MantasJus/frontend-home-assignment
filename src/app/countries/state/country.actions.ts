import { createAction, props } from '@ngrx/store';
import { Country } from '../country';

export const initialLoad = createAction(
    '[Country] Initial Load'
);

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

export const sortCountries = createAction(
    '[Country] Sort Countries',
    props<{ sortField: string , ascending: boolean }>()
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

export const loadCountryByAbr = createAction(
    '[Country] Load Country By Abr',
    props<{ abr: string }>()
);

export const loadCountryByAbrSuccess = createAction(
    '[Country] Load Country By Abr Success',
    props<{ country: Country }>()
);

export const loadCountryByAbrFailure = createAction(
    '[Country] Load Country By Abr Fail',
    props<{ error: string }>()
);