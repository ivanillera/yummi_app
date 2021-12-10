import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from  '@angular/fire/compat/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService } from './services/token-interceptor.service';

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/pages/searchbar/searchbar.component';
import { ThreadComponent } from './components/pages/thread/thread.component';
import { CrearApunteComponent } from './components/pages/crear-apunte/crear-apunte.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { environment } from 'src/environments/environment';
import { InfoperfilComponent } from './components/pages/perfil/infoperfil/infoperfil/infoperfil.component';
import { MisapuntesComponent } from './components/pages/perfil/misapuntes/misapuntes/misapuntes.component';
import { ApunteComponent } from './components/pages/apunte/apunte.component';
import { EditarApunteComponent } from './components/pages/perfil/misapuntes/editar-apunte/editar-apunte.component';
import { SignupComponent } from './components/pages/signup/signup.component';




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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    ReactiveFormsModule
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
