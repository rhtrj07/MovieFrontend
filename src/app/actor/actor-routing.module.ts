import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActorComponent } from './actor.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  {
    path: '',
    component: ActorComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: ProfileComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'edit', component: EditComponent },
      { path: 'movie', component: MovieComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {}
