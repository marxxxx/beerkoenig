import { Injectable } from '@angular/core';
import { BeerContestModel } from '../../models/BeerContestModel';
import { BeerResultModel } from '../../models/BeerResultModel';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  initResolveResult(contest: BeerContestModel): BeerResultModel[] {
    const result: BeerResultModel[] = [];
    for (let i = 1; i < contest.beerCount + 1; i++) {
      result.push({ number: i });
    }

    return result;
  }
}
