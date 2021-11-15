import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movie.component';
import { AuthGuard } from '../auth/auth.guard';
import { MovieStartComponent } from './movie-start/movie-start.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    // canActivate: [AuthGuard],
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {}
