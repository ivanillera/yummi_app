import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './global/navbar/navbar.component';
import { SearchbarComponent } from './home/searchbar/searchbar.component';
import { FooterComponent } from './global/footer/footer.component';
import { ForumComponent } from './pages/forum/forum.component';
import { HomeComponent } from './pages/home/home.component';
import { ThreadComponent } from './forum/thread/thread.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchbarComponent,
    FooterComponent,
    ForumComponent,
    HomeComponent,
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
