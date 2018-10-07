import { BeerContestModel } from './../../models/BeerContestModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateStateService {

  readonly key = 'createState';

  constructor() { }

  setState(state: BeerContestModel) {
    localStorage.setItem(this.key, JSON.stringify(state));
  }

  getState(): BeerContestModel {
    const value = localStorage.getItem(this.key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }

  clearState(): void {
    localStorage.removeItem(this.key);
  }
}
