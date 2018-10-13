import { Component, OnInit, Input } from '@angular/core';
import { ParticipentResultModel } from 'src/models/ParticipentResultModel';
import { BeerResultModel } from 'src/models/BeerResultModel';

@Component({
  selector: 'app-participent-results',
  templateUrl: './participent-results.component.html',
  styleUrls: ['./participent-results.component.scss']
})
export class ParticipentResultsComponent implements OnInit {

  @Input()
  results: ParticipentResultModel[];

  @Input()
  contestResults?: BeerResultModel[];


  displayedColumns = ['beerNumber', 'beerId', 'correctBeerId', 'result'];

  constructor() { }

  ngOnInit() {
  }

  getCorrectBeerByNumber(no: number): BeerResultModel {
    if (!this.contestResults) {
      return null;
    }
    const result = this.contestResults.find(c => c.number === no);
    return result;
  }

}
