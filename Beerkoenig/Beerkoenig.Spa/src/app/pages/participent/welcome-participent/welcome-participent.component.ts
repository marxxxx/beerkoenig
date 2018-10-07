import { BeerContestModel } from './../../../../models/BeerContestModel';
import { AdminService } from './../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContestService } from '../../../services/contest.service';
import { BeerContestState } from '../../../../models/BeerContestState';
import { ContestStateService } from '../../../services/contest-state.service';

@Component({
  selector: 'app-welcome-participent',
  templateUrl: './welcome-participent.component.html',
  styleUrls: ['./welcome-participent.component.scss']
})
export class WelcomeParticipentComponent implements OnInit, OnDestroy {

  userName: string;
  contest: BeerContestModel;
  subs: Subscription[] = [];
  isBusy = false;
  isBusyCreating = false;
  isErrorCreatingParticipent = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private contestService: ContestService,
    private state: ContestStateService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.subs.push(this.route.paramMap.subscribe(p => {

      const contestId = p.get('contestId');
      this.load(contestId);

    }));
  }

  load(contestId: string) {

    this.isBusy = true;
    this.adminService.getContest(contestId).subscribe(r => {
      this.contest = r;
      this.isBusy = false;

      if (this.contest.state === BeerContestState.Completed) {
        this.router.navigate(['/result']);
      }
      console.log(r);

    }, e => {
      this.isBusy = false;
      console.error(e);
    });
  }

  onCreateParticipent() {
    this.isErrorCreatingParticipent = false;
    this.isBusyCreating = true;
    this.contestService.createParticipent(this.contest.id, this.userName).subscribe(r => {
      this.isBusyCreating = false;
      this.state.setContestState(this.contest.id, { userName: this.userName, currentResult: [] });

      this.router.navigate(['/voting', this.contest.id]);
    }, e => {
      this.isBusyCreating = false;
      this.isErrorCreatingParticipent = true;

    });

  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

}
