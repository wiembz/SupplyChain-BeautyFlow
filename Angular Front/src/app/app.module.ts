import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { COODashComponent } from './COO/coodash/coodash.component';
import { CPODashComponent } from './CPO/cpodash/cpodash.component';
import { MyChartComponent } from './CPO/my-chart/my-chart.component';
import { SerieComponent } from './CPO/serie/serie.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LMDashComponent } from './LM/lmdash/lmdash.component';
import { PredictorComponent } from './LM/predictor/predictor.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { PMComponent } from './ProcurementManager/pm/pm.component';
import { PredictComponent } from './SCPM/predict/predict.component';
import { SCPMDashComponent } from './SCPM/scpmdash/scpmdash.component';
import { AccessDeniedComponent } from './auth/access-denied/access-denied.component';
import { AddDecideurComponent } from './Superviseur/add-decideur/add-decideur.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PredictComponent,
    LoginComponent,
    HomePageComponent,
    CPODashComponent,
    COODashComponent,
    SCPMDashComponent,
    LMDashComponent,
    PMComponent,
    LoadingScreenComponent,
    SerieComponent,
    MyChartComponent,
    PredictorComponent,
    AccessDeniedComponent,
    AddDecideurComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
