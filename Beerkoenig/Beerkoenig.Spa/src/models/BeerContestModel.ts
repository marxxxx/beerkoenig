import { BeerContestState } from './BeerContestState';

import { BeerDefinitionModel } from './BeerDefinitionModel';

import { BeerResultModel } from './BeerResultModel';

export interface BeerContestModel {
    Id: string;
    State: BeerContestState;
    Timestamp: Date | string;
    CreatorUserName: string;
    Title: string;
    BeerCount: number;
    Beers: BeerDefinitionModel[];
    Results: BeerResultModel[];
}
