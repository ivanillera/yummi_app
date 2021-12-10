import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApunteComponent } from './components/pages/apunte/apunte.component';
import { CrearApunteComponent } from './components/pages/crear-apunte/crear-apunte.component';
import { InfoperfilComponent } from './components/pages/perfil/infoperfil/infoperfil/infoperfil.component';
import { EditarApunteComponent } from './components/pages/perfil/misapuntes/editar-apunte/editar-apunte.component';
import { MisapuntesComponent } from './components/pages/perfil/misapuntes/misapuntes/misapuntes.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { SearchbarComponent } from './components/pages/searchbar/searchbar.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ThreadComponent } from './components/pages/thread/thread.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'', component:SearchbarComponent
  },
  {
    path: '*', redirectTo: ''
  },
  {
    path:'apuntes', component:ThreadComponent
  },
  {
    path:'apunte', component: ApunteComponent
  },
  {
    path:'perfil', 
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'crear',
    component: CrearApunteComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'perfil/misapuntes',
    component: MisapuntesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'perfil/info',
    component:InfoperfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'perfil/editarapunte', 
    component:EditarApunteComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'signup', component:SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
