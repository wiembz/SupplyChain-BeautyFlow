import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { COODashComponent } from './COO/coodash/coodash.component';
import { CPODashComponent } from './CPO/cpodash/cpodash.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { LMDashComponent } from './LM/lmdash/lmdash.component';
import { PredictComponent } from './SCPM/predict/predict.component';
import { SCPMDashComponent } from './SCPM/scpmdash/scpmdash.component';
import { SerieComponent } from './serie/serie.component';
import { PredictorComponent } from './predictor/predictor.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AddDecideurComponent } from './add-decideur/add-decideur.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'predict', component: PredictComponent },
  //{path : 'serie' ,component: SerieComponent},
  //{path : 'prediction' , component : PredictorComponent},

  {
    path: 'addDecieurs',
    component: AddDecideurComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['superviseur'] } // Seul le superviseur peut accéder
  },
  { 
    path: 'home', 
    component: HomePageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      roles: 'superviseur',
      breadcrumb: 'Prédictions' 
    } 
  },
  { 
    path: 'COO',
    component: COODashComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['superviseur', 'COO'] }
  },
  { 
    path: 'CPO',
    component: CPODashComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['superviseur', 'CPO'] }
  },
  { 
    path: 'SCPM',
    component: SCPMDashComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['superviseur', 'SCPM'] }
  },
  { 
    path: 'LM',
    component: LMDashComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['superviseur', 'LM'] }
  },
  { 
    path: 'serie',
    component: COODashComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['superviseur', 'CPO'] }
  },
  { 
    path: 'predict',
    component: PredictComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['superviseur', 'SCPM'] }
  },
  { 
    path: 'prediction',
    component: PredictorComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['superviseur', 'LM'] }
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
