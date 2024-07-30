import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'contries-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent implements OnInit {

  public initialTermValue?: string;

  public countries: Country[] = [];

  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    if (!this.countriesService.catchStorage) return;
    this.initialTermValue = this.countriesService.catchStorage.byCapital.term;
    this.countries = this.countriesService.catchStorage.byCapital.countries;
  }

  searchByCapital(term: string): void {

    this.isLoading = true;

    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
