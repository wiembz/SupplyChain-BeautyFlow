import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { COODashComponent } from './COO/coodash/coodash.component';
import { CPODashComponent } from './CPO/cpodash/cpodash.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { LMDashComponent } from './LM/lmdash/lmdash.component';
import { PredictComponent } from './SCPM/predict/predict.component';
import { SCPMDashComponent } from './SCPM/scpmdash/scpmdash.component';
import { SerieComponent } from './serie/serie.component';
import { PredictorComponent } from './predictor/predictor.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'predict', component: PredictComponent },
  {path : 'serie' ,component: SerieComponent},
  { path: 'predict', component: PredictComponent },
  {path : 'prediction' , component : PredictorComponent},
  { path: 'home', component: HomePageComponent },
{ path: 'lm',component :LMDashComponent}  ,
{ path: 'CPO', component: CPODashComponent },
  { path: 'COO', component: COODashComponent },
  { path: 'SCPM', component: SCPMDashComponent },
  {path: 'PM', component: SCPMDashComponent}, // Assuming PMComponent is the dashboard for Procurement Manager


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
