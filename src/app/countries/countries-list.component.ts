import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Country } from './country';
import { getFilteredCountries, getRegions, State } from './state/country.reducer';
import * as CountryActions from './state/country.actions';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit{
  countries$!: Observable<Country[]>;
  regions$!: Observable<string[]>;

  regionOptions: string[] = [];
  searchQuerry: string = '';
  
  constructor(private store: Store<State>) { }

  filterPressed(searchQuery: string, regionSelection: string): void {
    this.store.dispatch(CountryActions.filterCountries({ search:searchQuery.toLowerCase(), region:regionSelection}));
    //console.log('search word: '+searchQuery, 'region selected: '+regionSelection);
  }

  ngOnInit(): void {
    this.countries$ = this.store.select(getFilteredCountries);
    this.regions$ = this.store.select(getRegions);
    this.store.dispatch(CountryActions.loadCountries());
    this.store.dispatch(CountryActions.loadRegions());
  }
}