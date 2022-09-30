import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { Country } from "./country";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class CountryService {

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.API_PATH)
      .pipe(
        //tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getRegions(): Observable<string[]> {
    return this.http.get<Country[]>(environment.API_PATH+'?fields=region')
      .pipe(
        map(data => {
          const regions: string[] = data.map(value => value.region);
          return regions.filter((element, index) => regions.indexOf(element)===index);
        }),
        //tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    console.error(err);
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    return throwError(() => errorMessage);
  }
}