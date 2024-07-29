import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'contries-country-page',
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit {

  public country?: Country;
  public translations?: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }: Params) => this.countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe(country => {
        if (!country) return this.router.navigateByUrl('');

        this.translations = Object.keys(country.translations)
          .map(key => country.translations[key].common);
        
          return this.country = country;
      });
  }
}
