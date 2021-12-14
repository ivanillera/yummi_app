import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService } from './services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/pages/searchbar/searchbar.component';
import { ThreadComponent } from './components/pages/thread/thread.component';
import { CrearApunteComponent } from './components/pages/crear-apunte/crear-apunte.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { InfoperfilComponent } from './components/pages/perfil/infoperfil/infoperfil/infoperfil.component';
import { MisapuntesComponent } from './components/pages/perfil/misapuntes/misapuntes/misapuntes.component';
import { ApunteComponent } from './components/pages/apunte/apunte.component';
import { EditarApunteComponent } from './components/pages/perfil/misapuntes/editar-apunte/editar-apunte.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { FilterPipe } from './pipes/filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchbarComponent,
    ThreadComponent,
    CrearApunteComponent,
    PerfilComponent,
    InfoperfilComponent,
    MisapuntesComponent,
    ApunteComponent,
    EditarApunteComponent,
    SignupComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
