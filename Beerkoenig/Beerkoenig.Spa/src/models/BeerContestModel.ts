import { BeerContestState } from './BeerContestState';

import { BeerDefinitionModel } from './BeerDefinitionModel';

import { BeerResultModel } from './BeerResultModel';

export interface BeerContestModel {
    id?: string;
    state?: BeerContestState;
    timestamp?: Date | string;
    creatorUserName?: string;
    title?: string;
    beerCount?: number;
    beers?: BeerDefinitionModel[];
    results?: BeerResultModel[];
}
