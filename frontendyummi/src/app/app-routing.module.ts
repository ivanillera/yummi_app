import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrearApunteComponent } from './components/pages/crear-apunte/crear-apunte.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { SearchbarComponent } from './components/pages/searchbar/searchbar.component';
import { ThreadComponent } from './components/pages/thread/thread.component';

const routes: Routes = [
  {
    path:'', component:SearchbarComponent
  },
  {
    path:'apuntes', component:ThreadComponent
  },
  {
    path:'perfil', component:PerfilComponent
  },
  {
    path:'crear', component:CrearApunteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
