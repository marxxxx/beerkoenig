import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ContestStateService } from './services/contest-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Beerkoenig';
  subs: Subscription[] = [];

  constructor(private updateService: SwUpdate,
    private pushService: SwPush,
    private snackbar: MatSnackBar,
    private contestStateService: ContestStateService) {
  }

  ngOnInit() {

    this.subs.push(this.updateService.available.subscribe(e => {
      this.snackbar.open('Update verfügbar.', 'OK')
        .onAction().subscribe(r => {
          location.reload(true);
        });
    }));


    this.subs.push(this.pushService.messages.subscribe((m: any) => {
      console.log(m);
      if (m.notification && m.notification.body) {
        this.snackbar.open(m.notification.body, 'OK');
        this.contestStateService.contestFinished$.next();
      }
    }));

  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

}
