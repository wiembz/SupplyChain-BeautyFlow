import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { COODashComponent } from './COO/coodash/coodash.component';
import { CPODashComponent } from './CPO/cpodash/cpodash.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LMDashComponent } from './LM/lmdash/lmdash.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { PMComponent } from './ProcurementManager/pm/pm.component';
import { PredictComponent } from './SCPM/predict/predict.component';
import { SCPMDashComponent } from './SCPM/scpmdash/scpmdash.component';

@NgModule({
  declarations: [
    AppComponent,
    PredictComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    CPODashComponent,
    COODashComponent,
    SCPMDashComponent,
    LMDashComponent,
    PMComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
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
