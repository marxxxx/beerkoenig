import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { CreateComponent } from './pages/admin/create/create.component';
import { BeersComponent } from './pages/admin/beers/beers.component';
import { StartComponent } from './pages/admin/start/start.component';
import { ResolveComponent } from './pages/admin/resolve/resolve.component';
import { WelcomeParticipentComponent } from './pages/participent/welcome-participent/welcome-participent.component';
import { VotingComponent } from './pages/participent/voting/voting.component';
import { ResultComponent } from './pages/participent/result/result.component';
import { BeerItemComponent } from './pages/admin/beers/beer-item/beer-item.component';
import { BeerVoteComponent } from './pages/participent/voting/beer-vote/beer-vote.component';
import { BeerResolveComponent } from './pages/admin/resolve/beer-resolve/beer-resolve.component';
import { CompletedComponent } from './pages/admin/completed/completed.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule , MatIconModule, MatCardModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import 'hammerjs';
import { TasteResultsComponent } from './components/taste-results/taste-results.component';
import { ParticipentResultsComponent } from './components/participent-results/participent-results.component';
import { ContestResultsComponent } from './components/contest-results/contest-results.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CreateComponent,
    BeersComponent,
    StartComponent,
    ResolveComponent,
    WelcomeParticipentComponent,
    VotingComponent,
    ResultComponent,
    BeerItemComponent,
    BeerVoteComponent,
    BeerResolveComponent,
    CompletedComponent,
    ProgressSpinnerComponent,
    TasteResultsComponent,
    ParticipentResultsComponent,
    ContestResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
