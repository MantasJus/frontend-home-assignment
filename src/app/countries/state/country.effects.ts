import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CountryService } from '../country.service';
import * as CountryActions from './country.actions';

@Injectable()
export class CountryEffects {

  constructor(private actions$: Actions, private countryService: CountryService) { }

  loadCountries$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CountryActions.loadCountries),
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
        ofType(CountryActions.loadRegions),
        mergeMap(() => this.countryService.getRegions()
          .pipe(
            map(regions => CountryActions.loadRegionsSuccess({ regions })),
            catchError(error => of(CountryActions.loadRegionsFailure({ error })))
          )
        )
      );
  });
}