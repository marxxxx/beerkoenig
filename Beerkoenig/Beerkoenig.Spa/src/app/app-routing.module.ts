import { ResultComponent } from './pages/shared/result/result.component';
import { VotingComponent } from './pages/participent/voting/voting.component';
import { WelcomeParticipentComponent } from './pages/participent/welcome-participent/welcome-participent.component';
import { ResolveComponent } from './pages/admin/resolve/resolve.component';
import { StartComponent } from './pages/admin/start/start.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './pages/admin/create/create.component';
import { BeersComponent } from './pages/admin/beers/beers.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'beers', component: BeersComponent },
  { path: 'start/:contestId', component: StartComponent },
  { path: 'resolve/:contestId', component: ResolveComponent },
  { path: ':contestId', component: WelcomeParticipentComponent },
  { path: 'voting/:contestId', component: VotingComponent },
  { path: 'result/:contestId', component: ResultComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
