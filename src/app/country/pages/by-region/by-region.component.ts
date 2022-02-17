import { Component } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class ByRegionComponent {
  regions: string[] = [
    'EU',
    'EFTA',
    'CARICOM',
    'PA',
    'AU',
    'USAN',
    'EEU',
    'AL',
    'ASEAN',
    'CAIS',
    'CEFTA',
    'NAFTA',
    'SAARC',
  ];
  countries: Country[] = [];
  activeRegion: string = '';
  isError: boolean = false;

  constructor(private countryService: CountryService) {}

  getCSSClass(region: string): string {
    return region === this.activeRegion
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  activateRegion(region: string): void {
    if (this.activeRegion === region) {
      return;
    }
    this.activeRegion = region;
    this.countries = [];

    this.countryService.searchByRegion(this.activeRegion)
    .subscribe(
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
}
