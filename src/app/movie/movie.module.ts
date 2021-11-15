import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MoviesComponent } from './movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieItemComponent } from './movie-list/movie-item/movie-item.component';
import { MovieStartComponent } from './movie-start/movie-start.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieRoutingModule } from './movie-routing.module';
//import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieItemComponent,
    MovieStartComponent,
    MovieEditComponent
  ],
  imports: [
    RouterModule,
    
    ReactiveFormsModule,
    MovieRoutingModule,
   // SharedModule
  ],


  exports: [
    MovieListComponent
  ]


})
export class RecipesModule {}
