import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ContestResultModel } from '../../models/ContestResultModel';
import { HttpClient } from '@angular/common/http';
import { ParticipentResultModel } from '../../models/ParticipentResultModel';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  readonly baseUrl = environment.baseUrl + 'result/';

  constructor(private http: HttpClient) { }

  getContestResults(contestId: string): Observable<ContestResultModel[]> {
    const url = `${this.baseUrl}${contestId}/contest`;
    return this.http.get<ContestResultModel[]>(url);
  }

  getParticipentResults(contestId: string, userName: string): Observable<ParticipentResultModel[]> {
    const url = `${this.baseUrl}${contestId}/participent/${userName}`;
    return this.http.get<ParticipentResultModel[]>(url);
  }
}
