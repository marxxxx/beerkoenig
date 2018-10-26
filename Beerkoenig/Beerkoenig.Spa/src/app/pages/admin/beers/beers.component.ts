import { AdminService } from './../../../services/admin.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BeerContestModel } from '../../../../models/BeerContestModel';
import { CreateStateService } from '../../../services/create-state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit, OnDestroy {

  contest: BeerContestModel;
  isBusy = false;
  subs: Subscription[] = [];

  constructor(
    private admin: AdminService,
    private state: CreateStateService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.subs.push(this.route.params.subscribe(p => {
      this.contest = this.state.getState();
      if (this.contest.beers == null) {
        this.contest.beers = [];
      }

      if (!this.contest.beerCount) {
        this.contest.beerCount = 1;
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  onAdd() {
    this.contest.beers.push({ id: '', description: '' });
  }

  onDelete(id: string) {
    const index = this.contest.beers.findIndex(b => b.id === id);
    if (index >= 0) {
      this.contest.beers.splice(index, 1);
    }
  }

  onCreate() {
    this.state.setState(this.contest);

    this.isBusy = true;
    this.admin.createContest(this.contest).subscribe(contestId => {

      this.isBusy = false;
      this.contest.id = contestId;

      this.router.navigate(['/start', contestId]);

    }, e => {
      console.error('error creating contest');
      this.isBusy = false;
    });
  }

  isValid(): boolean {
    if (!this.contest || !this.contest.beers) {
      return false;
    }

    if ((this.contest.beers.length >= this.contest.beerCount) &&
      (this.contest.beers.every(b => b.id != null && b.id.length > 0))) {
      return true;
    } else {
      return false;
    }
  }
}
