import { BeerResultModel } from './../../models/BeerResultModel';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BeerContestModel } from '../../models/BeerContestModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly baseUrl = environment.baseApiUrl + 'admin/';

  constructor(private http: HttpClient) { }

  getContest(id: string): Observable<BeerContestModel> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get<BeerContestModel>(url);
  }

  createContest(contest: BeerContestModel): Observable<string> {
    return this.http.post<string>(this.baseUrl, contest);
  }

  startContest(id: string): Observable<any> {
    const url = `${this.baseUrl}${id}/start`;
    return this.http.put(url, {});
  }

  completeContest(id: string, result: BeerResultModel[]): Observable<any> {
    const url = `${this.baseUrl}${id}/complete`;
    return this.http.put(url, result);
  }

  getBeerImageUploadUrl(): string {
    const url = `${this.baseUrl}UploadBeerImage`;
    return url;
  }
}
