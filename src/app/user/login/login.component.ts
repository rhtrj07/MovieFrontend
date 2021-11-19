import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  styles: []
})
export class LoginComponent implements OnInit {
  isAuthenticated ;
  isLoggedIn$: Observable<boolean>;

  
  formModel = {
    Username: '',
    Password: ''
  }
  constructor(private service: UserService, private router: Router, private toastr: ToastrService ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/movie');
  }

  onSubmit(form: NgForm) {

    this.service.login(form.value)

  }
}
