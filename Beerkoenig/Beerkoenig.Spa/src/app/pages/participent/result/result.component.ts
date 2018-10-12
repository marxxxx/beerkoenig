import { Component, OnInit } from '@angular/core';
import { BeerContestModel } from '../../../../models/BeerContestModel';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ResultService } from '../../../services/result.service';
import { ContestResultModel } from '../../../../models/ContestResultModel';
import { ParticipentResultModel } from '../../../../models/ParticipentResultModel';
import { ContestStateService } from '../../../services/contest-state.service';

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
  participentResult: ParticipentResultModel[] = [];


  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminService,
    private resultService: ResultService,
    private stateService: ContestStateService) { }

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
    }, e => {
      this.isBusy = false;
      console.error(e);
    });


    const state = this.stateService.getContestState(contestId);

    this.resultService.getParticipentResults(contestId, state.userName)
      .subscribe(r => {
        this.participentResult = r;
      }, e => {
        console.error(e);
      });


    this.resultService.getContestResults(contestId)
      .subscribe(r => {
        this.contestResult = r;
      }, e => {
        console.error(e);
      });



  }

}
