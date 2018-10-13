import { BeerContestModel } from './../../../../models/BeerContestModel';
import { AdminService } from './../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContestService } from '../../../services/contest.service';
import { BeerContestState } from '../../../../models/BeerContestState';
import { ContestStateService } from '../../../services/contest-state.service';
import { SwPush } from '@angular/service-worker';
import { PushInfoModel } from 'src/models/PushInfoModel';

@Component({
  selector: 'app-welcome-participent',
  templateUrl: './welcome-participent.component.html',
  styleUrls: ['./welcome-participent.component.scss']
})
export class WelcomeParticipentComponent implements OnInit, OnDestroy {

  readonly VALID_PUBLIC_KEY = 'BEWE50sZ5SaMdf9L2_HW5SwKpP7l3yclUrN_KAbwrPS8fvYkD4UH1TzR5zVzrWQuxRAkrJ2eHEVeHWKvn4zvD2s';

  userName: string;
  contest: BeerContestModel;
  subs: Subscription[] = [];
  isBusy = false;
  isBusyCreating = false;
  isErrorCreatingParticipent = false;
  pushInfo: PushInfoModel;

  constructor(private route: ActivatedRoute, private router: Router,
    private contestService: ContestService,
    private state: ContestStateService,
    private adminService: AdminService,
    private swPush: SwPush) { }

  ngOnInit() {
    this.subs.push(this.route.paramMap.subscribe(p => {

      const contestId = p.get('contestId');
      this.load(contestId);

    }));

    this.swPush.requestSubscription({ serverPublicKey: this.VALID_PUBLIC_KEY }).then(r => {

      this.pushInfo = this.getPushInfo(r);

    }).catch(e => {

      console.error('Push registration failed.');
      console.error(e);
    });
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

  getPushInfo(sub: PushSubscription): PushInfoModel {

    const subJSObject = JSON.parse(JSON.stringify(sub));

    const pushInfo: PushInfoModel = {
      subscriptionEndpoint: sub.endpoint,
      auth: subJSObject.keys.auth,
      p256dh: subJSObject.keys.p256dh
    };

    console.log('got push info');
    console.log(pushInfo);
    return pushInfo;
  }


  onCreateParticipent() {
    this.isErrorCreatingParticipent = false;
    this.isBusyCreating = true;
    this.contestService.createParticipent(this.contest.id, this.userName, this.pushInfo).subscribe(r => {
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
