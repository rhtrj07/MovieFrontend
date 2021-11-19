import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {DatePipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movie/movie.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieStartComponent } from './movie/movie-start/movie-start.component';
import { MovieEditComponent } from './movie/movie-edit/movie-edit.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { MovieService } from './movie/movie.service';
import { ActorComponent } from './actor/actor.component';
import { ProfileComponent } from './actor/profile/profile.component';
import { MovieComponent } from './actor/movie/movie.component';
import { EditComponent } from './actor/edit/edit.component';
import { SidebarComponent } from './actor/sidebar/sidebar.component';
import { ActorlistComponent } from './actorlist/actorlist.component';
import { ListComponent } from './actorlist/list/list.component';
import { DetailsComponent } from './actorlist/details/details.component';
import { StartactorComponent } from './actorlist/startactor/startactor.component';
import { EditactorComponent } from './actorlist/editactor/editactor.component';
import { ActorListService } from './actorlist/actorlist.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MoviesComponent,
    MovieStartComponent,
    MovieEditComponent,
    MovieDetailComponent,
    ActorComponent,
    ProfileComponent,
    MovieComponent,
    EditComponent,
    SidebarComponent,
    ActorlistComponent,
    ListComponent,
    DetailsComponent,
    StartactorComponent,
    EditactorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule
  ],

 
  providers: [DatePipe, UserService, MovieService,ActorListService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
