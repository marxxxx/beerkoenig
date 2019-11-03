import { Subscription } from 'rxjs';
import { BeerContestModel } from './../../../../models/BeerContestModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreateStateService } from '../../../services/create-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {

  contest: BeerContestModel;
  contestId: string;
  isBusy = false;
  subs: Subscription[] = [];
  participentLink: string;
  resolveLink: string;
  isStarted: boolean;

  constructor(
    private admin: AdminService,
    private state: CreateStateService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit() {

    this.subs.push(this.route.paramMap.subscribe(p => {

      this.contest = this.state.getState();
      this.contestId = p.get('contestId');
    }));

  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  onStart() {

    this.isBusy = true;
    this.admin.startContest(this.contestId).subscribe(r => {

      this.isBusy = false;
      this.isStarted = true;

      this.participentLink = `${environment.frontendUrl}/${this.contestId}`;
      this.resolveLink =  `${environment.frontendUrl}/resolve/${this.contestId}`;

    }, e => {
      this.isBusy = false;
      console.error(e);
    });

  }

  onCopyToClipboard(el) {
    console.log('copy to clipboard');
    console.log(el);
    el.select();
    document.execCommand('copy');
    this.snackbar.open('Link in Zwischenablage kopiert', null, {
      duration: 1000
    });
  }
}
