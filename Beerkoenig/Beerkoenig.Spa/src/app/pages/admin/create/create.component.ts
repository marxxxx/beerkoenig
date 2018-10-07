import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerContestModel } from '../../../../models/BeerContestModel';
import { Subscription } from 'rxjs';
import { CreateStateService } from '../../../services/create-state.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  contest: BeerContestModel;
  isBusy = false;
  subs: Subscription[] = [];

  constructor(
    private state: CreateStateService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.subs.push(this.route.params.subscribe(p => {

      this.state.clearState();
      this.contest = { timestamp: new Date(), beers: [] };

    }));

  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  onCreate() {
    this.state.setState(this.contest);

    this.router.navigate(['/beers']);
  }
}
