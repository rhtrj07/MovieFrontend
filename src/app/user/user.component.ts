import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isRoleIn$: Observable<string>;
  
  constructor( private service: UserService ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.service.isLoggedIn;
    this.isRoleIn$ = this.service.isRoleIn;
  }

}
