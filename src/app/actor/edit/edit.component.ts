import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/actor/actor.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  actorForm: FormGroup;
  actor: Actor;
  files : File;
  filestring : string;
  
  constructor(private service: UserService ,private router: Router,private route: ActivatedRoute,) { }
  

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
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

  
    if(this.actorForm.value.photo.includes("undefined"))
    {
      this.actorForm.value.photo = this.actor.photo;
    }


   this.service.updateActorInfo(this.actor.id, this.actorForm.value);
  
  this.onCancel();
}

onCancel() {
  this.router.navigate(['../'], { relativeTo: this.route });
}

  private initForm(actor :Actor) {

    let id = this.actor.id;
    let aname = this.actor.aname;
    let username = this.actor.username;
    let age = this.actor.age;
    let experience = this.actor.experience;
    let email = this.actor.email;
    let gender = this.actor.gender;
    let phone = this.actor.phone;
    let photo = this.actor.photo;


    this.actorForm = new FormGroup ({
      photo: new FormControl(photo),
      aname: new FormControl(aname, Validators.required),
      username: new FormControl(username, Validators.required),
      age: new FormControl(age, Validators.required),
      experience: new FormControl(experience, Validators.required),
      email : new FormControl(email, Validators.required),
      gender : new FormControl(gender, Validators.required),
      phone : new FormControl(phone, [ Validators.required , Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      id : new FormControl(id, Validators.required),
    });
  }
}