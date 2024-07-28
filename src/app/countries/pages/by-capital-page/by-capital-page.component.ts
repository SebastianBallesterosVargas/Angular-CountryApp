import { Component } from '@angular/core';

@Component({
  selector: 'contries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  searchByCapital(term: string): void {
    console.log('Desde bycapitalpage');
    console.log({ term });
  }
}
