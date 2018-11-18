import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-tease-result',
  templateUrl: './tease-result.component.html',
  styleUrls: ['./tease-result.component.scss']
})
export class TeaseResultComponent implements OnInit, OnDestroy {

  countDown = 10;
  private timerId: any;
  private contestId: string;
  private userName: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.contestId = p.get('contestId');
      this.userName = this.route.snapshot.queryParamMap.get('userName');

      this.timerId = setInterval(() => {

        if (this.countDown === 1) {
          clearInterval(this.timerId);
          this.router.navigate(['result', this.contestId], { queryParams: { userName: this.userName, isTeasing: true } });
        }

        this.countDown = this.countDown - 1;
      }, 1000);
    });

  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

}
