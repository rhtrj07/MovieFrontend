import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActorlistComponent } from './actorlist.component';
import { DetailsComponent } from './details/details.component';
import { EditactorComponent } from './editactor/editactor.component';
import { StartactorComponent } from './startactor/startactor.component';



const routes: Routes = [
  {
    path: '',
    component: ActorlistComponent,
    // canActivate: [AuthGuard],
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {}
