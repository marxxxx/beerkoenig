import { Component, OnInit, Input } from '@angular/core';
import { ContestResultModel } from 'src/models/ContestResultModel';

@Component({
  selector: 'app-contest-results',
  templateUrl: './contest-results.component.html',
  styleUrls: ['./contest-results.component.scss']
})
export class ContestResultsComponent implements OnInit {

  @Input()
  results: ContestResultModel[];


  displayedColumns = ['position', 'correctBeers', 'userName'];

  constructor() { }

  ngOnInit() {
  }

}
