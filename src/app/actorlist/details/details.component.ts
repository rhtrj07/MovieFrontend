import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ActorListService } from '../actorlist.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  actor : any;
  id : number

  constructor(
    private service : ActorListService, 
    private route: ActivatedRoute,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.activeRoute.url.subscribe(params => {
        this.ngOnInit();
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    
    this.service.getActor(this.id).subscribe(
      res => {
        this.actor  = res;
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  }

  onEditActor() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteActor(){
    if(confirm("Are you sure to delete the Actor")) {
      this.service.deleteActor(this.id);
      this.router.navigate(['../']);
    }
  }

}
