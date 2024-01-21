import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { MatchesComponent } from './matches/matches.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatchFormComponent } from './match-form/match-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EquipeFormComponent } from './equipe-form/equipe-form.component';
import { JoueurFormComponent } from './joueur-form/joueur-form.component';
import { MatchjourFormComponent } from './matchjour-form/matchjour-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { DataServiceService } from '../service/data-service.service';
import { SaisonFormComponent } from './saison-form/saison-form.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MatchesComponent,
    LoginComponent,
    DashboardComponent,
    MatchFormComponent,
    NavbarComponent,
    SidebarComponent,
    EquipeFormComponent,
    MatchjourFormComponent,
    JoueurFormComponent,
    SaisonFormComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
