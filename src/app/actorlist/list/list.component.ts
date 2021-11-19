import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ActorListService } from '../actorlist.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  actors : any

  constructor(
    private service : ActorListService, 
    private CommonService : UserService,
    private route: ActivatedRoute,
    private toastr : ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.activeRoute.url.subscribe(params => {
        this.ngOnInit();
    });
  }

  ngOnInit(): void {

    this.CommonService.Start();

    this.service.getActorsEdit().subscribe(
      res => {
        this.actors = res;
        console.log(res);
      },
      err => {
        if (err.status == 403)
        {this.toastr.error('You are not Authenticated.');
        this.router.navigate(['/movie']);}
        else
          console.log(err);
      }
    );
  }

  onNewActor() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
