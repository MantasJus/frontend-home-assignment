
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as CountryActions from './country.actions';
import { Country } from '../country';

export interface State {
    countries: CountryState;
}

export interface CountryState {
    countries: Country[];
    error: string;
    searchInput: string;
    filterRegion: string;
}

const initialState: CountryState = {
    countries: [],
    error: '',
    searchInput: '',
    filterRegion: ''
};

// Selector functions
const getCountryFeatureState = createFeatureSelector<CountryState>('countries');

export const getCountries = createSelector(
    getCountryFeatureState,
    state => state.countries
);

export const getError = createSelector(
    getCountryFeatureState,
    state => state.error
);

export const getFilterRegion = createSelector(
    getCountryFeatureState,
    state => state.filterRegion
);

export const getSearchInput = createSelector(
    getCountryFeatureState,
    state => state.searchInput
);

export const countryReducer = createReducer<CountryState>(
    initialState,
    on(CountryActions.loadCountriesSuccess, (state, action): CountryState => {
        return {
            ...state,
            countries: action.countries,
            error: ''
        };
    }),
    on(CountryActions.loadCountriesFailure, (state, action): CountryState => {
        return {
            ...state,
            countries: [],
            error: action.error
        };
    })
);