import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // private authStatusListener = new Subject<boolean>();

  isLoggedIn$: Observable<boolean>;

  isRoleIn$: Observable<string>;

  isAuthenticated = false;
  
  userDetails;
  constructor(private router: Router, private service: UserService ) { }

  
  ngOnInit() {
    this.service.Start();

    this.isLoggedIn$ = this.service.isLoggedIn;
    this.isRoleIn$ = this.service.isRoleIn;

  }

  onSignin(){
    this.router.navigate(['/user/login']);
    this.ngOnInit()
  }

  onProfile(){
    this.router.navigate(['/actor']);
  }

  onActors(){
    this.router.navigate(['/actorlist']);

  }
  
  onLogout() {
    this.service.Logout();
    this.ngOnInit()
  }

  onHome(){
    this.router.navigate(['home']);
  }

  onMovie(){
    this.router.navigate(['movie']);
  }

  
}
