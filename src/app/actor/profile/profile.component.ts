import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/actor/actor.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserService) { }
  
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

}
