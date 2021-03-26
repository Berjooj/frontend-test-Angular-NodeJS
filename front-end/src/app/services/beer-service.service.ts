import { Beer } from './../models/beer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeerServiceService {
  private readonly API = `${environment.API}`;

  constructor(private httpClient: HttpClient) { }

  read() {
    let link = `${this.API}/`;
    return this.httpClient.get<Beer[]>(link);
  }

  random(amount: number) {
    let link = `${this.API}/random/${amount}`;
    return this.httpClient.get<Beer>(link);
  }
}
