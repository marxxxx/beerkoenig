import { Component, OnInit, Input } from '@angular/core';
import { BeerDefinitionModel } from '../../../../../models/BeerDefinitionModel';

@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.scss']
})
export class BeerItemComponent implements OnInit {

  @Input()
  beer: BeerDefinitionModel;

  @Input()
  isEditable: boolean;

  constructor() { }

  ngOnInit() {
  }

}
