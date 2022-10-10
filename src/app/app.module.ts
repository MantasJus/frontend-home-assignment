import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { CountriesListComponent } from './countries/countries-list.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { countryReducer } from './countries/state/country.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from './countries/state/country.effects';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightPipe } from './pipes/highlight.pipe';
import { DisplayArrayPipe } from './pipes/display-array.pipe';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterBarComponent } from './countries/filter-bar.component';
import { DisplayObjectPipe } from './pipes/display-object.pipe';
import { RouterModule } from '@angular/router';
import { CountryDetailComponent } from './countries/country-detail.component';
import { CountryDetailGuard } from './countries/country-detail.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CountryCurrencyDisplayPipe } from './pipes/country-currency-stringify.pipe';
import { HistoryEffects } from './countries/history/country-history.effects';
import { historyReducer } from './countries/history/country-history.reducer';
import { HeaderComponent } from './header/header.component';
import { ClickOutsideDirective } from './click-outside.directive';

const rootReducer = {
  countries: countryReducer,
  countriesHist: historyReducer
}

@NgModule({
  declarations: [
    AppComponent,
    CountriesListComponent,
    HighlightPipe,
    DisplayArrayPipe,
    PaginatorComponent,
    FilterBarComponent,
    DisplayObjectPipe,
    CountryDetailComponent,
    ErrorPageComponent,
    CountryCurrencyDisplayPipe,
    HeaderComponent,
    ClickOutsideDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([CountryEffects, HistoryEffects]),
    MatPaginatorModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'countries', component: CountriesListComponent},
      { path: 'countries/:abr', canActivate: [CountryDetailGuard], component: CountryDetailComponent},
      { path: '', redirectTo: 'countries', pathMatch: 'full' },
      { path: 'error', component:ErrorPageComponent },
      { path: '**', redirectTo: 'error', pathMatch: 'full' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
