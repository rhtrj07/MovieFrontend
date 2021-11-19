
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Actor } from 'src/app/actor/actor.model';
import { ActorListService } from '../actorlist.service';

@Component({
  selector: 'app-editactor',
  templateUrl: './editactor.component.html',
  styleUrls: ['./editactor.component.css']
})
export class EditactorComponent implements OnInit {

  actorForm: FormGroup;
  actor: Actor;
  files : File;
  filestring : string
  id : number
  editMode = false;

  
  constructor(private service: ActorListService ,private router: Router,private route: ActivatedRoute,) { }
  

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; 

    });
    
    if (this.editMode)
    {
      this.service.getActor(this.id).subscribe(
        res => {
          this.actor = res;
          console.log(res);
          this.initForm(this.actor);
        },
        err => {
          console.log(err);
          
        },
      );
    }
    else{
      this.actor = {
        id : null ,
        aname : null ,
        username : null ,
        age : null ,
        experience : null ,
        email : null ,
        gender : null ,
        phone : null ,
        photo : null
      }
      this.initForm(this.actor);
    }
  }

  getFiles(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
}

_handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.filestring = btoa(binaryString);  // Converting binary string data.
    console.log (this.filestring);
}

onSubmit() {

  this.filestring = "data:image/jpeg;base64,"+this.filestring;
  this.actorForm.value.photo = this.filestring;

  if(this.editMode)
  {
    if(this.actorForm.value.photo.includes("undefined"))
    {
      this.actorForm.value.photo = this.actor.photo;
    }

    this.service.updateActorInfo(this.actor.id, this.actorForm.value);
    this.onRefresh();
  }
  else
  {
    if(this.actorForm.value.photo.includes("undefined"))
    {
      this.actorForm.value.photo = null;
    }

    this.service.NewActor( this.actorForm.value);
    this.onRefresh();
  }
  
  this.onCancel();
}

onRefresh(){
  this.router.navigate(['/actorlist']);
}

onCancel() {
  this.router.navigate(['../'], { relativeTo: this.route });
}

  private initForm(actor :Actor) {

    let id = null;
    let aname =null;
    let username = null;
    let age = null;
    let experience = null;
    let email = null;
    let gender =null;
    let phone = null;
    let photo = null;
    let password = null;

    if(this.editMode)
    {
      id = this.actor.id;
      aname = this.actor.aname;
      username = this.actor.username;
      age = this.actor.age;
      experience = this.actor.experience;
      email = this.actor.email;
      gender = this.actor.gender;
      phone = this.actor.phone;
      password = null
    }

    this.actorForm = new FormGroup ({
      photo: new FormControl(photo),
      aname: new FormControl(aname, Validators.required),
      username: new FormControl(username, Validators.required),
      age: new FormControl(age, Validators.required),
      experience: new FormControl(experience, Validators.required),
      email : new FormControl(email, [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      gender : new FormControl(gender, Validators.required),
      phone : new FormControl(phone,[ Validators.required , Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      id : new FormControl(id, Validators.required),
      password : new FormControl(null),
    });
  }
}
