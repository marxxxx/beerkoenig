import { ContestStateService } from './../../../services/contest-state.service';
import { ContestState } from './../../../../models/ContestState';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BeerContestModel } from '../../../../models/BeerContestModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ContestService } from '../../../services/contest.service';
import { AdminService } from '../../../services/admin.service';
import { BeerContestState } from '../../../../models/BeerContestState';
import { BeerResultModel } from '../../../../models/BeerResultModel';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  state: ContestState;
  contest: BeerContestModel;
  subs: Subscription[] = [];
  isBusy = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private stateService: ContestStateService,
    private contestService: ContestService,
    private adminService: AdminService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.subs.push(this.route.paramMap.subscribe(p => {

      const contestId = p.get('contestId');
      this.state = this.stateService.getContestState(contestId);
      this.load(contestId);

      this.subs.push(this.stateService.contestFinished$.subscribe(_ => {
        this.router.navigate(['/result', contestId], {queryParams: { userName: this.state.userName}});

      }));
    }));


  }

  load(contestId: string) {

    this.isBusy = true;
    this.adminService.getContest(contestId).subscribe(r => {
      this.contest = r;
      this.isBusy = false;


      if (this.contest.state === BeerContestState.Completed) {
        this.router.navigate(['/result', contestId], {queryParams: { userName: this.state.userName}});
      }

      if (!this.state.currentResult || this.state.currentResult.length === 0) {
        this.state.currentResult = this.utilService.initResolveResult(r);
      }

    }, e => {
      this.isBusy = false;
      console.error(e);
    });
  }

  onSave() {
    this.stateService.setContestState(this.contest.id, this.state);

    console.log(this.state.currentResult);

    this.contestService.saveResults(this.contest.id, this.state.userName, this.state.currentResult).subscribe(r => {

      console.log('results saved successfully');
    }, e => {

      console.error(e);

    });
  }
}
