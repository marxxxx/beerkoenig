import { Component, OnInit } from '@angular/core';
import { BeerContestModel } from '../../../../models/BeerContestModel';
import { Subscription, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ResultService } from '../../../services/result.service';
import { ContestResultModel } from '../../../../models/ContestResultModel';
import { ParticipentResultModel } from '../../../../models/ParticipentResultModel';
import { ContestStateService } from 'src/app/services/contest-state.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {


  contest: BeerContestModel;
  subs: Subscription[] = [];
  isBusy = false;
  contestResult: ContestResultModel[] = [];
  participentResult: ParticipentResultModel[];
  userName: string;
  isTeasing = false;
  intervalId: any;


  constructor(private route: ActivatedRoute,
    private adminService: AdminService,
    private state: ContestStateService,
    private resultService: ResultService) { }

  ngOnInit() {
    const contestId = this.route.snapshot.paramMap.get('contestId');
    this.load(contestId);

    this.userName = this.route.snapshot.queryParamMap.get('userName');
    this.isTeasing = this.route.snapshot.queryParamMap.get('isTeasing') === 'true';

    // fallback for older links without username in query params
    if (!this.userName) {
      const contestState = this.state.getContestState(contestId);
      if (contestState) {
        this.userName = contestState.userName;
      }
    }

    if (this.userName) {
      this.loadParticipentResults(contestId, this.userName);
    }
  }

  load(contestId: string) {

    this.isBusy = true;

    forkJoin(this.adminService.getContest(contestId),
      this.resultService.getContestResults(contestId)
    ).subscribe(([contest, results]) => {
      this.isBusy = false;
      this.contest = contest;
      results.forEach(r => r.position = results.indexOf(r) + 1);
      if (this.isTeasing) {
        this.runTeasing(results);
      } else {
        this.contestResult = results;
      }
    }, e => {
      this.isBusy = false;
      console.error(e);
    });
  }


  loadParticipentResults(contestId: string, userName: string) {

    this.resultService.getParticipentResults(contestId, userName)
      .subscribe(r => {
        this.participentResult = r;
      }, e => {
        console.error(e);
      });
  }

  runTeasing(results: ContestResultModel[]) {
    let currentIndex = results.length;
    this.intervalId = setInterval(() => {

      this.contestResult = results.slice(currentIndex, results.length);
      currentIndex = currentIndex - 1;
      if (currentIndex < 0) {
        clearInterval(this.intervalId);
        setTimeout(() => this.isTeasing = false, 1000);
      }
    }, 1000);
  }

}
