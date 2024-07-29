import { Component, Input } from '@angular/core';

@Component({
  selector: 'country-translations',
  templateUrl: './country-translate.component.html'
})
export class CountryTranslateComponent {

  @Input()
  public countryTranslations?: string[];
}
