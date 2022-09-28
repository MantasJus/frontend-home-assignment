import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Country } from './country';
import { getFilteredCountries, getRegions, State } from './state/country.reducer';
import * as CountryActions from './state/country.actions';
import { Observable, Subscription, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit, OnDestroy {

  countries$!: Observable<Country[]>;
  regions$!: Observable<string[]>;

  searchBarForm!: FormGroup;
  inputsSub$!: Subscription;

  lowerRange: number = 0;
  higherRange: number = 25;
  
  constructor(private store: Store<State>) { }

  filterOnChange(): void {
    this.inputsSub$ = this.searchBarForm.valueChanges.subscribe(() => {
      this.store.dispatch(CountryActions
        .filterCountries({ search: this.searchBarForm.value.searchQuery.toLowerCase(), region: this.searchBarForm.value.regionSelection }));
    });
  }

  ngOnInit(): void {
    this.searchBarForm = new FormGroup({
      searchQuery: new FormControl(''),
      regionSelection: new FormControl('')
    });
    this.filterOnChange();
    this.countries$ = this.store.select(getFilteredCountries);
    this.regions$ = this.store.select(getRegions);
    this.store.dispatch(CountryActions.loadCountries());
    this.store.dispatch(CountryActions.loadRegions());
  }

  ngOnDestroy(): void {
    this.inputsSub$.unsubscribe();
  }

  setRange($event: number[]) {
    this.lowerRange = $event[0];
    this.higherRange = $event[1];
  }
}