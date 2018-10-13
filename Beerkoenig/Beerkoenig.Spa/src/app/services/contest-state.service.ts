import { ContestState } from '../../models/ContestState';
import { Injectable, EventEmitter } from '@angular/core';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root'
})
export class ContestStateService {

  readonly key = 'contest_';

  contestFinished$: EventEmitter<string> = new EventEmitter<string>();

  constructor(private signalRService: SignalRService) {
    signalRService.contestFinished$.subscribe(contestId => {

      this.contestFinished$.emit(contestId);

    });
  }

  setContestState(contestId: string, state: ContestState) {
    localStorage.setItem(this.key + contestId, JSON.stringify(state));
  }

  getContestState(contestId: string): ContestState {
    const value = localStorage.getItem(this.key + contestId);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }
}
