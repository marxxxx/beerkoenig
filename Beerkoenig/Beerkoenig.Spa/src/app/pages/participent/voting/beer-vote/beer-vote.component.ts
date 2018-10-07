import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BeerDefinitionModel } from '../../../../../models/BeerDefinitionModel';
import { BeerResultModel } from '../../../../../models/BeerResultModel';

@Component({
  selector: 'app-beer-vote',
  templateUrl: './beer-vote.component.html',
  styleUrls: ['./beer-vote.component.scss']
})
export class BeerVoteComponent implements OnInit {

  @Input()
  result: BeerResultModel;

  @Input()
  beers: BeerDefinitionModel[];

  @Output()
  resultChanged: EventEmitter<BeerResultModel> = new EventEmitter<BeerResultModel>();

  constructor() { }

  ngOnInit() {
  }

}
