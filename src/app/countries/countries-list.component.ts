import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Country } from './country';
import { getCountriesToDisplay, getRegions, getSearchQuery, getSelectedRegion, getSortingInfo } from './state/country.reducer';
import * as CountryActions from './state/country.actions';
import { Observable, take } from 'rxjs';
import { RootState } from '../state/app.reducer';

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
  
  constructor(private store: Store<RootState>) { }

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
    var fieldToCheck: string = '';
    var ascToCheck: boolean = true;;
    this.sortingInfo$.pipe(take(1)).subscribe(
      ({field, ascending}) => {
        fieldToCheck = field;
        ascToCheck = ascending;
    });
    fieldToCheck === field && ascToCheck === asc?
      this.store.dispatch(CountryActions.sortCountries({sortField: '', ascending:true})) :
      this.store.dispatch(CountryActions.sortCountries({sortField: field, ascending:asc}));
  }
}