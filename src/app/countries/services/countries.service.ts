import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CountriesParameter } from '../interfaces/countries-parameters.interface';
import { CacheStorage } from '../interfaces/catch-storage.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private _apiUrl: string = 'https://restcountries.com/v3.1/';

  public catchStorage: CacheStorage = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { countries: [] }
  };

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.getRestCountries(CountriesParameter.Alpha, code)
      .pipe(
        map((countries) => (countries.length === 0 ? null : countries[0])),
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.getRestCountries(CountriesParameter.Capital, term)
      .pipe(
        tap(countries => this.catchStorage.byCapital = { term, countries }),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getRestCountries(CountriesParameter.Country, term)
      .pipe(
        tap(countries => this.catchStorage.byCountry = { term, countries }),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchRegion(term: Region): Observable<Country[]> {
    return this.getRestCountries(CountriesParameter.Region, term)
    .pipe(
      tap(countries => this.catchStorage.byRegion = { term, countries }),
      tap( () => this.saveToLocalStorage() )
    );
  }

  private getRestCountries(param: CountriesParameter, term: string): Observable<Country[]> {
    const url = `${this._apiUrl}${param}/${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        delay(2000)
      );
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStorage', JSON.stringify(this.catchStorage));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStorage')) return;

    this.catchStorage = JSON.parse(localStorage.getItem('cacheStorage')!);
  }
}
