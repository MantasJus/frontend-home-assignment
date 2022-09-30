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

@NgModule({
  declarations: [
    AppComponent,
    CountriesListComponent,
    HighlightPipe,
    DisplayArrayPipe,
    PaginatorComponent,
    FilterBarComponent,
    DisplayObjectPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({'countries': countryReducer}),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([CountryEffects]),
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
