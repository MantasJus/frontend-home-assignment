import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, takeWhile } from 'rxjs';
import { Country } from '../country';
import { getCountryByAbr } from '../state/country.reducer';
import * as CountryHistoryActions from '../history/country-history.actions';
import { RootState } from '../../state/app.reducer';

@Component({
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  selectedCountry$!: Observable<Country | undefined>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<RootState>) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const CountId: string = this.route.snapshot.paramMap.get('abr')!;
    this.selectedCountry$ = this.store.select(getCountryByAbr(CountId));

    this.selectedCountry$.pipe(takeWhile(val => val==undefined, true))
      .subscribe(
        (value) => {
          if(value!=undefined)
          {
            this.store.dispatch(CountryHistoryActions.storeCountryToHistory({country: value}))
          }
        }
      )
  }

}