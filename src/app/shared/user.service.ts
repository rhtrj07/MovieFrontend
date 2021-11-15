import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Actor } from '../actor/actor.model';
import { Movie } from '../movie/movie.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }



  constructor(private router: Router,private fb: FormBuilder, private http: HttpClient , private toastr: ToastrService ) { }
  readonly BaseURI = 'http://localhost:44325/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post<any>(this.BaseURI +'https://localhost:44325/api/Authenticate/Register', body);
  }

  login(formData) {
    return this.http.post<any>('https://localhost:44325/api/Authenticate/login', formData).subscribe(
      (res: any) => {
        localStorage.setItem("role",res.role);
        localStorage.setItem('username',res.username);
        localStorage.setItem('token', res.token);
        this.loggedIn.next(true);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 401)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
      
      );
    }

  getUser() {
    return this.http.get('https://localhost:44325/api/Authenticate/user');
  }

  isUserLoggedIn(){
    if (localStorage.getItem('token') != null)
      return true;
    else {
      return false;
    }
  }

  Logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);

  }

  getUserProfile(){
    var username = localStorage.getItem("username");
    return this.http.get<Actor>('https://localhost:44325/api/Actors/user/'+username.toString());
  }

  updateActorInfo(id: number, actor: Actor){
    var address = 'https://localhost:44325/api/Actors/'+id.toString();
    
     this.http.put(address,actor).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  getUserMovie()
  {
    var username = localStorage.getItem("username");
    return this.http.get<Movie[]>('https://localhost:44325/api/link/moviesbyuser/'+username.toString());
  }
}
