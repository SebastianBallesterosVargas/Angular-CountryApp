import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CountriesParameter } from '../interfaces/countries-parameters.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private _apiUrl: string = 'https://restcountries.com/v3.1/';

  constructor(private httpClient: HttpClient) {}

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.getRestCountries(CountriesParameter.Alpha, code)
      .pipe(
        map((countries) => (countries.length === 0 ? null : countries[0])),
      );
  }

  searchCapital(capital: string): Observable<Country[]> {
    return this.getRestCountries(CountriesParameter.Capital, capital);
  }

  searchCountry(name: string): Observable<Country[]> {
    return this.getRestCountries(CountriesParameter.Country, name);
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.getRestCountries(CountriesParameter.Region, region);
  }

  private getRestCountries(param: CountriesParameter, term: string): Observable<Country[]> {
    const url = `${this._apiUrl}${param}/${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      );
  }
}
