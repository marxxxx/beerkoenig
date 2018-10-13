import { Component, OnInit, Input } from '@angular/core';
import { BeerResultModel } from 'src/models/BeerResultModel';

@Component({
  selector: 'app-taste-results',
  templateUrl: './taste-results.component.html',
  styleUrls: ['./taste-results.component.scss']
})
export class TasteResultsComponent implements OnInit {

  @Input()
  results: BeerResultModel[];


  displayedColumns = ['number', 'beerId', 'vote'];

  constructor() { }

  ngOnInit() {
  }

}
