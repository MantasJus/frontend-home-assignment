
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as CountryActions from './country.actions';
import { Country } from '../country';

export interface State {
    countries: CountryState;
}

export interface CountryState {
    countries: Country[];
    displayedCountries: Country[];
    regions: string[];
    error: string;
    searchInput: string;
    filterRegion: string;
}

const initialState: CountryState = {
    countries: [],
    displayedCountries: [],
    regions: [],
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

export const getFilteredCountries = createSelector(
    getCountryFeatureState,
    state => state.displayedCountries
);

export const getRegions = createSelector(
    getCountryFeatureState,
    state => state.regions
);

export const countryReducer = createReducer<CountryState>(
    initialState,
    on(CountryActions.loadCountriesSuccess, (state, action): CountryState => {
        return {
            ...state,
            countries: action.countries,
            displayedCountries: action.countries,
            error: ''
        };
    }),
    on(CountryActions.loadCountriesFailure, (state, action): CountryState => {
        return {
            ...state,
            countries: [],
            displayedCountries: [],
            error: action.error
        };
    }),
    on(CountryActions.loadRegionsSuccess, (state, action): CountryState => {
        return {
            ...state,
            regions: action.regions,
            error: ''
        };
    }),
    on(CountryActions.loadRegionsFailure, (state, action): CountryState => {
        return {
            ...state,
            regions: [],
            error: action.error
        };
    }),
    on(CountryActions.filterCountries, (state, action): CountryState => {
        //console.log(action); // later on should come query and region
        var filteredCountries: Country[] = action.region.length == 0 ? state.countries : state.countries.filter(country => country.region === action.region);
        filteredCountries = action.search.length == 0 ? filteredCountries : filteredCountries.filter(country => country.countryName.toLowerCase().includes(action.search)
                                                                                                            || country.capital.map(capital => capital.toLowerCase()).some(capital => capital.includes(action.search))
                                                                                                            || country.languages.map(language => language.toLowerCase()).some(language => language.includes(action.search)));
        //console.log('result: '+filteredCountries);
        return {
            ...state,
            countries: state.countries,
            displayedCountries: filteredCountries,
            error: ''
        };
    })
);