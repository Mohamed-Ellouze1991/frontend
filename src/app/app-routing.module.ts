import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { MatchesComponent } from './matches/matches.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { EquipeFormComponent } from './equipe-form/equipe-form.component';
import { JoueurFormComponent } from './joueur-form/joueur-form.component';
import { MatchjourFormComponent } from './matchjour-form/matchjour-form.component';
import { SaisonFormComponent } from './saison-form/saison-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'match-form', component: MatchFormComponent },
  { path: 'equipe-form', component: EquipeFormComponent },
  { path: 'joueur-form', component: JoueurFormComponent },
  { path: 'matchjour-form', component: MatchjourFormComponent },
  { path: 'match/:id', component: MatchFormComponent },
  { path: 'saison-form', component: SaisonFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
