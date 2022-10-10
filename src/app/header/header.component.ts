import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoredCountryHist } from '../countries/country';
import { getHistory } from '../countries/history/country-history.reducer';
import { RootState } from '../countries/state/country.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  countryHistory$!: Observable<StoredCountryHist[]>;
  dropdownOpen: boolean = false;

  constructor(private store: Store<RootState>) { }

  ngOnInit(): void {
    this.countryHistory$ = this.store.select(getHistory);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

}