import { EventEmitter, Injectable, OnInit } from '@angular/core';
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
export class UserService implements OnInit{

  currauth : boolean
  currrole : string
  private loggedIn: BehaviorSubject<boolean> =new BehaviorSubject<boolean>( false );
  private RoleIn : BehaviorSubject<string> = new BehaviorSubject<string>( "" );

  ngOnInit(){

     this.http.get<any>('https://localhost:44325/api/Authenticate/user').subscribe(
      res => { this.currauth = res.isAuthenticated 
               this.currrole = res.role
              this.loggedIn.next(this.currauth);
              this.RoleIn.next(this.currrole);

          // this.loggedIn = new BehaviorSubject<boolean>( this.currauth );
          // this.RoleIn = new BehaviorSubject<string>( this.currrole );
      }
    )
  }

  // private loggedIn: BehaviorSubject<boolean> =new BehaviorSubject<boolean>( this.currauth );
  // private RoleIn : BehaviorSubject<string> = new BehaviorSubject<string>( this.currrole );



  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  get isRoleIn() {
    return this.RoleIn.asObservable();
  }



  constructor(private router: Router,private fb: FormBuilder, private http: HttpClient , private toastr: ToastrService ) { }
  readonly BaseURI = 'http://localhost:44325/api';


  Start()
  {
    this.ngOnInit();
  }

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
        localStorage.setItem('token', res.token);
        this.loggedIn.next(true);
        this.RoleIn.next(res.userRoles);
        this.router.navigateByUrl('/movie');
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
    this.RoleIn.next("");
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);

  }

  getUserProfile(){
    //var username = localStorage.getItem("username");
    return this.http.get<Actor>('https://localhost:44325/api/Actors/curruser');
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
    //var username = localStorage.getItem("username");
    return this.http.get<Movie[]>('https://localhost:44325/api/link/moviesbyuser');
  }
}
