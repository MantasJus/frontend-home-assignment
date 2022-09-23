import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Country } from './country';
import { getCountries, State } from './state/country.reducer';
import * as CountryActions from './state/country.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit{
  countries$!: Observable<Country[]>;
  
  constructor(private store: Store<State>) { }

  filterPressed(): void {//interface for filter? 
    //console.log(this.countries$);
    this.countries$ = this.store.select(getCountries);
  }

  ngOnInit(): void {
    this.countries$ = this.store.select(getCountries);
    this.store.dispatch(CountryActions.loadCountries());
  }
}