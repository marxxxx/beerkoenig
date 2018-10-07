import { UtilService } from './../../../services/util.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BeerContestModel } from '../../../../models/BeerContestModel';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { BeerResultModel } from '../../../../models/BeerResultModel';
import { ResolveStateService } from '../../../services/resolve-state.service';
import { BeerContestState } from '../../../../models/BeerContestState';

@Component({
  selector: 'app-resolve',
  templateUrl: './resolve.component.html',
  styleUrls: ['./resolve.component.scss']
})
export class ResolveComponent implements OnInit, OnDestroy {

  contest: BeerContestModel;
  subs: Subscription[] = [];
  isBusy = false;
  isBusyCompleting = false;
  result: BeerResultModel[] = [];


  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminService,
    private utilService: UtilService,
    private resolveStateService: ResolveStateService) { }

  ngOnInit() {
    this.subs.push(this.route.paramMap.subscribe(p => {

      const contestId = p.get('contestId');
      this.load(contestId);

    }));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  load(contestId: string) {

    this.isBusy = true;
    this.adminService.getContest(contestId).subscribe(r => {
      this.contest = r;
      this.isBusy = false;

      if (this.contest.state === BeerContestState.Completed) {
        this.router.navigate(['/completed', contestId]);
      } else {

        this.result = this.resolveStateService.getState(contestId);
        if (this.result == null || this.result.length === 0) {
          this.result = this.utilService.initResolveResult(this.contest);
        }
      }
    }, e => {
      this.isBusy = false;
      console.error(e);
    });
  }

  onResolve() {
    this.isBusyCompleting = true;
    this.adminService.completeContest(this.contest.id, this.result).subscribe(r => {
      this.isBusyCompleting = false;
      this.router.navigate(['/completed', this.contest.id]);
    }, e => {
      this.isBusyCompleting = false;
      console.error(e);
    });
  }

  isValid(): boolean {
    let valid = false;

    if (this.result.length === this.contest.beerCount && this.result.every(r => r.beerId != null)) {
      valid = true;
    }

    return valid;
  }

}
