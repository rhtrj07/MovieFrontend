import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/actor/actor.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }
  
  actor: Actor

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {
        this.actor = res;
        console.log(res);
      },
      err => {
        console.log(err);
      },
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
