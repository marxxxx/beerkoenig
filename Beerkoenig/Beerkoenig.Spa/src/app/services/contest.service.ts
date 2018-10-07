import { BeerResultModel } from './../../models/BeerResultModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  readonly baseUrl = environment.baseUrl + 'contest/';

  constructor(private http: HttpClient) { }

  createParticipent(contestId: string, userName: string): Observable<any> {
    const url = `${this.baseUrl}${contestId}/${userName}`;
    return this.http.post(url, {});
  }

  saveResults(contestId: string, userName: string, results: BeerResultModel[]): Observable<any> {
    const url = `${this.baseUrl}${contestId}/${userName}`;
    return this.http.put(url, results);
  }
}
