import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Country } from './country';
import { getCountriesToDisplay, getRegions, State } from './state/country.reducer';
import * as CountryActions from './state/country.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  countries$!: Observable<Country[]>;
  regions$!: Observable<string[]>;

  lowerRange: number = 0;
  higherRange: number = 25;

  searchQuery:string = '';
  regionSelect:string = '';
  
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.countries$ = this.store.select(getCountriesToDisplay);
    this.regions$ = this.store.select(getRegions);
    this.store.dispatch(CountryActions.loadCountries());
    this.store.dispatch(CountryActions.loadRegions());
  }

  setRange($event: number[]) {
    this.lowerRange = $event[0];
    this.higherRange = $event[1];
  }

  filterCountries($event:{searchQuery:string, regionSelect:string}): void {
    this.store.dispatch(CountryActions.filterCountries({
      search: $event.searchQuery.toLowerCase(), region: $event.regionSelect
    }));
    this.searchQuery = $event.searchQuery;
    this.regionSelect = $event.regionSelect;
  }

  sortCountries(field: string, asc: boolean): void {
    this.store.dispatch(CountryActions.sortCountries({sortField: field, ascending:asc}));
  }
}