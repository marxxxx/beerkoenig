import { Component, OnInit } from '@angular/core';
import { BeerContestModel } from '../../../../models/BeerContestModel';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ResultService } from '../../../services/result.service';
import { ContestResultModel } from '../../../../models/ContestResultModel';
import { ParticipentResultModel } from '../../../../models/ParticipentResultModel';

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


  constructor(private route: ActivatedRoute,
    private adminService: AdminService,
    private resultService: ResultService) { }

  ngOnInit() {
    const contestId = this.route.snapshot.paramMap.get('contestId');
    this.userName = this.route.snapshot.queryParamMap.get('userName');
    this.load(contestId);

    if (this.userName) {
      this.loadParticipentResults(contestId, this.userName);
    }
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



    this.resultService.getContestResults(contestId)
      .subscribe(r => {
        this.contestResult = r;
      }, e => {
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

}
