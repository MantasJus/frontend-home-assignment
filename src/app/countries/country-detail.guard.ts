import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { concat, first, map, Observable, skip, take, tap } from 'rxjs';
import { CountryState, State } from './state/country.reducer';
import * as CountryActions from './state/country.actions';

@Injectable({
  providedIn: 'root'
})
export class CountryDetailGuard implements CanActivate {
  constructor(private router: Router, private store: Store<State>) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    const countId = route.paramMap.get('abr');
    if(typeof(countId)!='string' || countId.length!=3) {
      this.router.navigate(['/error']);
      return false;
    }

    return concat(this.loadIfNotLoaded(), this.countryExists(route.params['abr'])).pipe(skip(1));;
  }

private get countryState$(): Observable<CountryState>
{
 return this.store.pipe(
    select(state => state.countries));
}

private loadIfNotLoaded(): Observable<boolean>
{
   return this.countryState$.pipe(
    map(state => state.countries.length>0),
    take(1),
    tap(loaded=> {
      if (!loaded) {
        this.store.dispatch(CountryActions.loadCountries());
      }
    }));
}

private countryExists(abr: string): Observable<boolean>
{
  return this.countryState$.pipe(
    first(state => state.countries.length>0),
    map(state => state.countries.find(country => country.cca3 === abr)),
    map((country) => {
     if(!!country) return true;
     this.router.navigate(['/error']);
     return false;
   })
  );
}
}