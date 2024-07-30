import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent implements OnInit {

  public initialTermValue?: string;  

  public countries: Country[] = [];

  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    if (!this.countriesService.catchStorage) return;
    this.initialTermValue = this.countriesService.catchStorage.byCountry.term;
    this.countries = this.countriesService.catchStorage.byCountry.countries;
  }

  searchByCountry(term: string): void {

    this.isLoading = true;

    this.countriesService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
