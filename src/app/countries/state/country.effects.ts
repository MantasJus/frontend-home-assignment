import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CountryService } from '../country.service';
import * as CountryActions from './country.actions';

@Injectable()
export class CountryEffects implements OnInitEffects {

  constructor(private actions$: Actions, private countryService: CountryService) { }
  ngrxOnInitEffects(): Action {
    return CountryActions.initialLoad();
  }

  loadCountries$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CountryActions.loadCountries, CountryActions.initialLoad),
        mergeMap(() => this.countryService.getCountries()
          .pipe(
            map(countries => CountryActions.loadCountriesSuccess({ countries })),
            catchError(error => of(CountryActions.loadCountriesFailure({ error })))
          )
        )
      );
  });
  loadRegions$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CountryActions.loadRegions, CountryActions.initialLoad),
        mergeMap(() => this.countryService.getRegions()
          .pipe(
            map(regions => CountryActions.loadRegionsSuccess({ regions })),
            catchError(error => of(CountryActions.loadRegionsFailure({ error })))
          )
        )
      );
  });
}