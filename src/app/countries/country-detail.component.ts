import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from './country';
import { getCountryByAbr, State } from './state/country.reducer';

@Component({
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  selectedCountry$!: Observable<Country | undefined>;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    const CountId: string = this.route.snapshot.paramMap.get('abr')!;
    this.selectedCountry$ = this.store.select(getCountryByAbr(CountId));
  }

}
