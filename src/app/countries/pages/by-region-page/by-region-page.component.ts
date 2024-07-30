import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']; 

  public selectedRegion?: Region;

  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    if (!this.countriesService.catchStorage) return;
    this.selectedRegion = this.countriesService.catchStorage.byRegion.term;
    this.countries = this.countriesService.catchStorage.byRegion.countries;
  }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.isLoading = true;

    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
