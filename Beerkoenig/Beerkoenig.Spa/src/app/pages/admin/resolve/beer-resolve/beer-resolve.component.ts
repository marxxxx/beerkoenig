import { Component, OnInit, Input } from '@angular/core';
import { BeerResultModel } from '../../../../../models/BeerResultModel';
import { BeerDefinitionModel } from '../../../../../models/BeerDefinitionModel';

@Component({
  selector: 'app-beer-resolve',
  templateUrl: './beer-resolve.component.html',
  styleUrls: ['./beer-resolve.component.scss']
})
export class BeerResolveComponent implements OnInit {

  @Input()
  result: BeerResultModel;

  @Input()
  beers: BeerDefinitionModel[];

  constructor() { }

  ngOnInit() {
  }

}
