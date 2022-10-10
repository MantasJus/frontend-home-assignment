import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { StoredCountryHist } from "../country";
import * as CountryHistoryActions from './country-history.actions';

export interface HistoryState {
    HistorCountries: StoredCountryHist[];
    errorMsg: string;
};

const initialState: HistoryState = {
    HistorCountries: [],
    errorMsg: ''
};

// Selector functions
const getCountryFeatureState = createFeatureSelector<HistoryState>('countriesHist');

export const getHistory = createSelector(
    getCountryFeatureState,
    state => state.HistorCountries
);

export const getHistoryError = createSelector(
    getCountryFeatureState,
    state => state.errorMsg
);

export const historyReducer = createReducer<HistoryState>(
    initialState,
    on(CountryHistoryActions.loadHistorySuccess, CountryHistoryActions.storingSuccess, (state, action): HistoryState => {
        return {
            ...state,
            HistorCountries: action.storedCountries,
            errorMsg: ''
        };
    }),
    on(CountryHistoryActions.loadHistoryFailure, (state, action): HistoryState => {
        return {
            ...state,
            HistorCountries: [],
            errorMsg: action.error
        };
    })
)