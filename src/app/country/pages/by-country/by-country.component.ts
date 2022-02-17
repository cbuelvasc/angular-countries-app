import { Component } from '@angular/core';

import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class ByCountryComponent {
  term: string = '';
  isError: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  placeholder: string = 'Search by country...';
  showSuggestion: boolean = false;

  constructor(private countryService: CountryService) {}

  search(term: string): void {
    this.showSuggestion = false;
    this.isError = false;
    this.term = term;

    this.countryService.searchByCountry(this.term).subscribe(
      (countries) => {
        this.countries = countries;
      },
      (error) => {
        this.isError = true;
        console.log(this.isError);
        this.countries = [];
      }
    );
  }

  suggestion(term: string): void {
    this.showSuggestion = true;
    this.isError = false;
    this.term = term;
    this.countryService.searchByCountry(term).subscribe(
      (countries) => (this.suggestedCountries = countries.splice(0, 5)),
      (err) => (this.suggestedCountries = [])
    );
  }
}
