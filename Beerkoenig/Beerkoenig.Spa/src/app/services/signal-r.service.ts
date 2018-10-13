import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {


  hubConnection: HubConnection;
  contestFinished$ = new EventEmitter<string>();

  constructor() {
    this.createConnection();
    this.registerEvents();
    this.startConnection();
  }

  private createConnection() {
    const url = environment.baseUrl + 'notification';
    console.log('signalR url: ' + url);
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(url)
      .build();
  }

  private startConnection() {
    this.hubConnection.start().then(() => {
      console.log('Connection started');
    }).catch(err => {
      console.error(err);
      setTimeout(() => this.startConnection(), 5000);
    });
  }

  private registerEvents() {
    this.hubConnection.on('contestFinished', (contestId: string) => {
      console.log('contest finished:' + contestId);
      this.contestFinished$.emit(contestId);
    });
  }
}
