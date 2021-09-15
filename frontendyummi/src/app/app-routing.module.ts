import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrearApunteComponent } from './components/pages/crear-apunte/crear-apunte.component';
import { InfoperfilComponent } from './components/pages/perfil/infoperfil/infoperfil/infoperfil.component';
import { MisapuntesComponent } from './components/pages/perfil/misapuntes/misapuntes/misapuntes.component';
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
  },
  {
    path:'perfil/misapuntes', component:MisapuntesComponent
  },
  {
    path:'perfil/info', component:InfoperfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
