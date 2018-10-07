import { BeerResultModel } from './../../models/BeerResultModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResolveStateService {

  readonly key = 'resolve_state_';

  constructor() { }

  setState(contestId: string, state: BeerResultModel[]) {
    localStorage.setItem(this.key + contestId, JSON.stringify(state));
  }

  getState(contestId: string): BeerResultModel[] {
    const value = localStorage.getItem(this.key + contestId);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }
}
