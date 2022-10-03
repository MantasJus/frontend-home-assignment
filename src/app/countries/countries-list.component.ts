import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Country } from './country';
import { getCountriesToDisplay, getRegions, getSearchQuery, getSelectedRegion, getSortingInfo, State } from './state/country.reducer';
import * as CountryActions from './state/country.actions';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  countries$!: Observable<Country[]>;
  regions$!: Observable<string[]>;
  sortingInfo$!: Observable<{field: string, ascending: boolean}>;
  searchQuery$!: Observable<string>;
  regionSelect$!: Observable<string>;

  lowerRange: number = 0;
  higherRange: number = 25;
  
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.countries$ = this.store.select(getCountriesToDisplay);
    this.regions$ = this.store.select(getRegions);
    this.sortingInfo$ = this.store.select(getSortingInfo);
    this.searchQuery$ = this.store.select(getSearchQuery);
    this.regionSelect$ = this.store.select(getSelectedRegion);
  }

  setRange($event: number[]) {
    this.lowerRange = $event[0];
    this.higherRange = $event[1];
  }

  filterCountries($event:{searchQuery:string, regionSelect:string}): void {
    this.store.dispatch(CountryActions.filterCountries({
      search: $event.searchQuery.toLowerCase(), region: $event.regionSelect
    }));
  }

  sortCountries(field: string, asc: boolean): void {
    this.store.dispatch(CountryActions.sortCountries({sortField: field, ascending:asc}));
  }
}