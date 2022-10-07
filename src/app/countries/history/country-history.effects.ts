import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { map } from "rxjs";
import { StoredCountryHist } from "../country";
import * as CountryHistoryActions from './country-history.actions';

@Injectable()
export class HistoryEffects implements OnInitEffects {

    constructor(private actions$: Actions) { }

    ngrxOnInitEffects(): Action {
        return CountryHistoryActions.loadHistory();
    }

    loadHistoryCountries$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(CountryHistoryActions.loadHistory),
                map(() => {
                    const storageValue = localStorage.getItem("countryHistory");
                    if (storageValue) {
                        try {
                            const storedCountries: StoredCountryHist[] = JSON.parse(storageValue);
                            return CountryHistoryActions.loadHistorySuccess({ storedCountries: storedCountries });
                        } catch {
                            localStorage.removeItem("countryHistory");
                        }
                    }
                    return CountryHistoryActions.loadHistoryFailure({ error: 'History loading failure' });
                })
            );
    });

    saveCountryToHistory$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(CountryHistoryActions.storeCountryToHistory),
                map((historyData) => {
                    const histCountryToStore: StoredCountryHist = {abreviation: historyData.country.cca3, displayName: historyData.country.name.official};
                    const storageValue = localStorage.getItem("countryHistory");
                    var storedCountries: StoredCountryHist[] = [];
                    if (storageValue) {
                        try {
                            storedCountries = JSON.parse(storageValue);
                        } catch {
                            localStorage.removeItem("countryHistory");
                        }
                    }
                    if(Object.prototype.toString.call(storedCountries) != '[object Array]') {
                        storedCountries = [];
                    }
                    if(storedCountries.length === 0) {
                        storedCountries.push(histCountryToStore);
                    }
                    else {
                        const existInd = storedCountries.findIndex(value => value.abreviation == histCountryToStore.abreviation)
                        if(existInd != -1) {
                            storedCountries.unshift(storedCountries.splice(existInd, 1)[0]);
                        }
                        else {
                            console.log(storedCountries.length);
                            storedCountries.unshift(histCountryToStore);
                        }
                    }

                    if(storedCountries.length > 5) {
                        storedCountries.splice(5);
                    }

                    localStorage.setItem("countryHistory", JSON.stringify(storedCountries));
                    return CountryHistoryActions.storingSuccess({storedCountries: storedCountries});
                })
        )
    });
}