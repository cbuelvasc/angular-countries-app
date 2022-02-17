import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [],
})
export class ByCapitalComponent implements OnInit {
  term: string = '';
  isError: boolean = false;
  countries: Country[] = [];
  placeholder: string = 'Search by capital...';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {}

  search(term: string) {
    this.isError = false;
    this.term = term;

    this.countryService.searchByCapital(this.term).subscribe(
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

  suggestion(term: string) {
    this.isError = false;
    //this.term = term;
  }
}
