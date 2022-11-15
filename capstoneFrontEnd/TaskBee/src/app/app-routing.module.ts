import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardcompComponent } from './dashboardcomp/dashboardcomp.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LazyLoadGuard } from './guards/lazy-load.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { NavcompComponent } from './navcomp/navcomp.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path:"",
    component:LandingPageComponent
  },
  {
    path:"home",
    component:NavcompComponent,
    canActivate:[AuthGuardGuard],
    canLoad:[LazyLoadGuard]
  },
  {
    path: "login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },{
    path:"about",
    component:AboutComponent
  },{
    path:"contact",
    component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
