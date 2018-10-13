import { Component, OnInit } from '@angular/core';
import { BeerContestModel } from '../../../../models/BeerContestModel';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ResultService } from 'src/app/services/result.service';
import { ContestResultModel } from 'src/models/ContestResultModel';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {


  contest: BeerContestModel;
  contestResult: ContestResultModel[];
  subs: Subscription[] = [];
  isBusy = false;


  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminService, private resultService: ResultService) { }

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


    this.resultService.getContestResults(contestId)
      .subscribe(r => {
        this.contestResult = r;
      }, e => {
        console.error(e);
      });

  }

}
