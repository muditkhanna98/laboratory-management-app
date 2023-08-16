import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestsComponent } from './components/tests/tests.component';
import { RegisterationComponent } from './components/auth/registeration/registeration.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PatientComponent } from './components/patient/patient.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterationComponent },
  { path: 'patients', component: PatientComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'tests', component: TestsComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
