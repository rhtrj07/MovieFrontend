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
  // isAuthenticated = false;
  userDetails;
  constructor(private router: Router, private service: UserService ) { }

  
  ngOnInit() {
    this.isLoggedIn$ = this.service.isLoggedIn;

  }

  onSignin(){
    this.router.navigate(['/user/login']);
  }
  
  onLogout() {
    this.service.Logout();
  }

  onHome(){
    this.router.navigate(['home']);
  }

  onMovie(){
    this.router.navigate(['movie']);
  }

  
}
