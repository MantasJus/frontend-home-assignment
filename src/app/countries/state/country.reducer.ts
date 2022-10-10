
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as CountryActions from './country.actions';
import { Country } from '../country';

export interface CountryState {
    countries: Country[];
    displayedCountries: Country[];
    selectedCountry: Country | undefined;
    selectionExists: boolean | undefined;
    regions: string[];
    error: string;
    searchInput: string;
    filterRegion: string;
    sorting: {
        field: string;
        ascending: boolean;
    };
}

const initialState: CountryState = {
    countries: [],
    displayedCountries: [],
    selectedCountry: undefined,
    selectionExists: undefined,
    regions: [],
    error: '',
    searchInput: '',
    filterRegion: '',
    sorting: {field: '', ascending: true}
};

// Selector functions
const getCountryFeatureState = createFeatureSelector<CountryState>('countries');

export const getCountries = createSelector(
    getCountryFeatureState,
    state => state.countries
);

export const getSelectedCountry = createSelector(
    getCountryFeatureState,
    state => state.selectedCountry
);

export const getSelectionExists = createSelector(
    getCountryFeatureState,
    state => state.selectionExists
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

export const getSortingInfo = createSelector(
    getCountryFeatureState,
    state => state.sorting
);

export const getSearchQuery = createSelector(
    getCountryFeatureState,
    state => state.searchInput
);

export const getSelectedRegion = createSelector(
    getCountryFeatureState,
    state => state.filterRegion
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
    on(CountryActions.loadCountryByAbr, (state, action): CountryState => {
        return {
            ...state,
            selectedCountry: undefined,
            selectionExists: undefined,
            error: ''
        };
    }),
    on(CountryActions.loadCountryByAbrSuccess, (state, action): CountryState => {
        return {
            ...state,
            selectedCountry: action.country,
            selectionExists: true,
            error: ''
        };
    }),
    on(CountryActions.loadCountryByAbrFailure, (state, action): CountryState => {
        return {
            ...state,
            selectedCountry: undefined,
            selectionExists: false,
            error: action.error
        };
    }),
    on(CountryActions.filterCountries, (state, action): CountryState => {
        return {
            ...state,
            countries: state.countries,
            searchInput: action.search,
            filterRegion: action.region,
            error: ''
        };
    }),
    on(CountryActions.sortCountries, (state, action): CountryState => {
        return {
            ...state,
            sorting: {field: action.sortField, ascending: action.ascending}
        };
    }),
    on(CountryActions.sortCountries, CountryActions.filterCountries, (state, action): CountryState => {
        var displayingCountries: Country[] = [...state.countries];
        displayingCountries = state.filterRegion.length == 0 ? displayingCountries : state.countries.filter(country => country.region === state.filterRegion);
        displayingCountries = state.searchInput.length == 0 ? displayingCountries : displayingCountries.filter(country => {
            const nameCheck = country.name.official.toLowerCase().includes(state.searchInput)
            const langCheck: boolean = country.languages===undefined? false : Object.keys(country.languages).map(lang => country.languages[lang]).map(language => language.toLowerCase()).some(language => language.includes(state.searchInput))
            const capitalCheck:boolean = country.capital==undefined? false : country.capital.map(capital => capital.toLowerCase()).some(capital => capital.includes(state.searchInput))
            return nameCheck || capitalCheck || langCheck
        });
        switch(state.sorting.field) {
            case 'Name':
                state.sorting.ascending?
                    displayingCountries.sort(
                        (a, b) => b.name.official.localeCompare(a.name.official)) :
                    displayingCountries.sort(
                        (a, b) => a.name.official.localeCompare(b.name.official))
                break;
            case 'Capital':
                state.sorting.ascending?
                    displayingCountries.sort(
                        (a, b) => b.capital.toString().localeCompare(a.capital.toString())) :
                    displayingCountries.sort(
                        (a, b) => a.capital.toString().localeCompare(b.capital.toString()))
                break;
            case 'Region':
                state.sorting.ascending?
                    displayingCountries.sort(
                        (a, b) => b.region.localeCompare(a.region)) :
                    displayingCountries.sort(
                        (a, b) => a.region.localeCompare(b.region))
                break;
        }
        return {
            ...state,
            displayedCountries: displayingCountries,
        };
    }),
);