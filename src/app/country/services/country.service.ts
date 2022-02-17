import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl: string = 'https://restcountries.com/v2';

  get httpParams(): HttpParams {
    return new HttpParams().set(
      'fields',
      'name,capital,alpha2Code,flag,population'
    );
  }

  constructor(private http: HttpClient) {}

  searchByCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${term}`, {params: this.httpParams});
  }

  searchByCapital(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`, {params: this.httpParams});
  }

  searchCountryByCode(id: string): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/alpha/${id}`);
  }

  searchByRegion(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/regionalbloc/${term}`, {params: this.httpParams});
  }
}
