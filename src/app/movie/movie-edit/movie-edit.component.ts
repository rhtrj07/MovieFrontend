import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { Actor } from '../actor.model';
import { ActorMovieLink } from '../actormovielink.model';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  id: number;
  editMode = false;
  movieForm: FormGroup;
  movie: Movie;
  files : File ;
  filestring : string;
  actors : any
  NextId : any;
  cast : Actor[];


  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.activeRoute.paramMap.subscribe(params => {
        this.ngOnInit();
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; 

    });

    if(this.editMode)
      {
        this.movieService.getMovieCast(this.id).subscribe(
          res => {
            this.cast = res;
            console.log(res);
          },
         
        );
    
        this.movieService.getMovie(this.id).subscribe(
          res => {
            this.movie = res;
            console.log(res);
            this.initForm(this.movie);

          },
          err => {
            console.log(err);
          },
        );

        this.movieService.getActors().subscribe(
          res => {
            this.actors = res;
            console.log(res);
            
          }
        );
      }

      else{
        this.movie = {
          id: null,
          mname: null,
          duration: null,
          genre: null,
          releasedate:null,
          rating: null,
          description: null,
          photo: null,
          MovieActorLinks : null
          
        }

        this.movieService.getActors().subscribe(
          res => {
            this.actors = res;
            console.log(res);
            this.initForm(this.movie);
          }
        );
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

onAddCast() {
  if(this.editMode){
    (<FormArray>this.movieForm.get('MovieActorLinks')).push(
      new FormGroup({
        Movieid: new FormControl(this.id),
        Actorid: new FormControl(null)
      })
    );
  }
  else{
    
    (<FormArray>this.movieForm.get('MovieActorLinks')).push(
      new FormGroup({
        Movieid: new FormControl(null),
        Actorid: new FormControl(null)
      })
    );
  }
}

onDeleteCast(index: number) {
  (<FormArray>this.movieForm.get('MovieActorLinks')).removeAt(index);
}


  onSubmit() {

    
    this.movieForm.value.cas
    this.filestring = "data:image/jpeg;base64,"+this.filestring;
    this.movieForm.value.photo = this.filestring;

    if (this.editMode) {

      if(this.movieForm.value.photo.includes("undefined"))
      {
        this.movieForm.value.photo = this.movie.photo;
      }

      this.movieService.updateMovie(this.id, this.movieForm.value);
    }
     else {
      this.movie = this.movieForm.value;

      if(this.movieForm.value.photo.includes("undefined"))
      {
        this.movieForm.value.photo = null;
      }

      this.movieService.addMovie(this.movie);
      //this.movieService.addMovieCast(this.movieForm.value.cast);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  private initForm(movie :Movie) {

    let genre = null
    let mname = null
    let duration = null
    let releasedate = null
    let rating =null
    let description =null
    let photo = null
    let casts = new FormArray([]);

    if (this.editMode) {

      genre = movie.genre;
      mname = movie.mname;
      duration = movie.duration
      releasedate =  this.datePipe.transform(movie.releasedate,"yyyy-MM-dd")
      rating =movie.rating;
      description =movie.description ;
      photo = null

       
      if (this.cast) {
        for (let castt of this.cast) {
          casts.push(
            new FormGroup({
              Movieid: new FormControl(this.id),
              Actorid: new FormControl(castt.id)
            })
          );
        }
      }
    }

    this.movieForm = new FormGroup ({
      photo: new FormControl(photo, Validators.required),
      mname: new FormControl(mname, Validators.required),
      description: new FormControl(description, Validators.required),
      duration : new FormControl(duration, Validators.required),
      genre : new FormControl(genre, Validators.required),
      releasedate : new FormControl(releasedate, Validators.required),
      rating : new FormControl(rating, Validators.required),
      MovieActorLinks : casts

    });
  }
}
