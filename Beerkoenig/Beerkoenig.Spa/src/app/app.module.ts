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
import { ResultComponent } from './pages/shared/result/result.component';
import { BeerItemComponent } from './pages/admin/beers/beer-item/beer-item.component';
import { BeerVoteComponent } from './pages/participent/voting/beer-vote/beer-vote.component';
import { BeerResolveComponent } from './pages/admin/resolve/beer-resolve/beer-resolve.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import 'hammerjs';
import { TasteResultsComponent } from './components/taste-results/taste-results.component';
import { ParticipentResultsComponent } from './components/participent-results/participent-results.component';
import { ContestResultsComponent } from './components/contest-results/contest-results.component';
import { WelcomeAnimationComponent } from './components/welcome-animation/welcome-animation.component';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { TeaseResultComponent } from './pages/participent/tease-result/tease-result.component';

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
    ProgressSpinnerComponent,
    TasteResultsComponent,
    ParticipentResultsComponent,
    ContestResultsComponent,
    WelcomeAnimationComponent,
    TeaseResultComponent
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
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTooltipModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    FileUploadModule,
    Ng2ImgMaxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
