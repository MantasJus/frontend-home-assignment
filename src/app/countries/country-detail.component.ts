import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { first, Observable, skip, take, takeWhile, tap } from 'rxjs';
import { Country } from './country';
import { getCountryByAbr, State } from './state/country.reducer';

@Component({
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  selectedCountry$!: Observable<Country | undefined>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<State>) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const CountId: string = this.route.snapshot.paramMap.get('abr')!;
    this.selectedCountry$ = this.store.select(getCountryByAbr(CountId));
  }

}
