import { ContestState } from '../../models/ContestState';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContestStateService {

  readonly key = 'contest_';

  contestFinished$: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

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
