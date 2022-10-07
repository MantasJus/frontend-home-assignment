import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './state/country.reducer';

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
    return true;
  }
}