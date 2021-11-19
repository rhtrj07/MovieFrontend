import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/actor/actor.model';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private toastr: ToastrService,private service: UserService, private router: Router , private CommonService : UserService) { }
  
  actor: Actor

  ngOnInit(): void {

    this.CommonService.Start();
    
    this.service.getUserProfile().subscribe(
      res => {
        this.actor = res;
        console.log(res);
      },
      err => {
        if (err.status == 403)
        {
        this.toastr.error('You are not Authenticated.');
        this.router.navigate(['/movie']);}
        if (err.status == 404){
        this.toastr.error('Not Found Any Actor.');
        this.router.navigate(['/movie']);}
        else
          console.log(err);
      }
    );
  }

  onProfile(){
    this.router.navigate(['/actor/profile']);
  }

  onEdit(){
    this.router.navigate(['/actor/edit']);
  }

  onMovies(){
    this.router.navigate(['/actor/movie']);
  }

}
