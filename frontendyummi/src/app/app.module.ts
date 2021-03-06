import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService } from './services/token-interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { FilestackModule } from '@filestack/angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {NgxPaginationModule} from 'ngx-pagination';


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
import { UrlsafePipe } from './pipes/urlsafe.pipe';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { SubjectFilterPipe } from './pipes/subject-filter.pipe';
import { CareerFilterPipe } from './pipes/career-filter.pipe';
import { CreatorPipe } from './pipes/creator.pipe';




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
    FilterPipe,
    UrlsafePipe,
    CategoryFilterPipe,
    SubjectFilterPipe,
    CareerFilterPipe,
    CreatorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FilestackModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    AngularEditorModule,
    NgxPaginationModule
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
