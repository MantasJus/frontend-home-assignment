
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

export const getCountriesToDisplay = createSelector(
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
        var filteredCountries: Country[] = action.region.length == 0 ? state.countries : state.countries.filter(country => country.region === action.region);
        filteredCountries = action.search.length == 0 ? filteredCountries : filteredCountries.filter(country => {
            var langArray: string[];
            const nameCheck = country.name.official.toLowerCase().includes(action.search)
            const langCheck: boolean = country.languages===undefined? false : Object.keys(country.languages).map(lang => country.languages[lang]).map(language => language.toLowerCase()).some(language => language.includes(action.search))
            const capitalCheck:boolean = country.capital==undefined? false : country.capital.map(capital => capital.toLowerCase()).some(capital => capital.includes(action.search))
            return nameCheck || capitalCheck || langCheck
        })
        return {
            ...state,
            countries: state.countries,
            displayedCountries: filteredCountries,
            error: ''
        };
    }),
    on(CountryActions.sortCountries, (state, action): CountryState => {
        var sortedCountries: Country[] = [...state.displayedCountries];
        switch(action.sortField) {
            case 'Name':
                action.ascending?
                    sortedCountries.sort(
                        (a, b) => b.name.official.localeCompare(a.name.official)) :
                    sortedCountries.sort(
                        (a, b) => a.name.official.localeCompare(b.name.official))
                break;
            case 'Capital':
                action.ascending?
                    sortedCountries.sort(
                        (a, b) => b.capital.toString().localeCompare(a.capital.toString())) :
                    sortedCountries.sort(
                        (a, b) => a.capital.toString().localeCompare(b.capital.toString()))
                break;
            case 'Region':
                action.ascending?
                    sortedCountries.sort(
                        (a, b) => b.region.localeCompare(a.region)) :
                    sortedCountries.sort(
                        (a, b) => a.region.localeCompare(b.region))
                break;
        }
        return {
            ...state,
            displayedCountries: sortedCountries
        };
    })
);