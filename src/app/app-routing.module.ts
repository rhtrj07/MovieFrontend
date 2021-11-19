import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movie/movie.component';
import { MovieStartComponent } from './movie/movie-start/movie-start.component';
import { MovieEditComponent } from './movie/movie-edit/movie-edit.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { ActorComponent } from './actor/actor.component';
import { ProfileComponent } from './actor/profile/profile.component';
import { EditComponent } from './actor/edit/edit.component';
import { MovieComponent } from './actor/movie/movie.component';
import { ActorlistComponent } from './actorlist/actorlist.component';
import { ListComponent } from './actorlist/list/list.component';
import { StartactorComponent } from './actorlist/startactor/startactor.component';
import { EditactorComponent } from './actorlist/editactor/editactor.component';
import { DetailsComponent } from './actorlist/details/details.component';

const routes: Routes = [
  {path:'',redirectTo:'/movie',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
//   {path:'home',component:HomeComponent
//   ,canActivate:[AuthGuard]
// },
  {
    path: 'movie', component: MoviesComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '', component: MovieStartComponent },
      { path: 'new', component: MovieEditComponent },
      {
        path: ':id',
        component: MovieDetailComponent
      },
      {
        path: ':id/edit',
        component: MovieEditComponent
      }
    ]
  },
  {
    path: 'actor', component: ActorComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProfileComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'edit',component: EditComponent },
      { path: 'movie',component: MovieComponent },
    ]
  },
  {
    path: 'actorlist', component: ActorlistComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StartactorComponent },
      { path: 'new', component: EditactorComponent },
      {
        path: ':id',
        component: DetailsComponent
      },
      {
        path: ':id/edit',
        component: EditactorComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
