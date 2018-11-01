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


  displayedColumns = ['vote', 'beerId' ];

  constructor() { }

  ngOnInit() {
    console.log('before sorting');
    console.log(this.results);
    this.results = this.results.sort((r1, r2) => {
      if (r1.vote > r2.vote) {
        return -1;
      } else if (r2.vote > r1.vote) {
        return 1;
      } else {
        return 0;
      }
    }
    );
    console.log('after sorting');
    console.log(this.results);
  }

}
