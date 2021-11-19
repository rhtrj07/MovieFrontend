import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { map, tap, take, exhaustMap } from 'rxjs/operators';



import { Movie } from './movie.model';
import { Actor } from './actor.model';
import { FormsModule } from '@angular/forms';
import { ReturnStatement } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ActorListService {
  movieChanged = new Subject<Movie[]>();

  casts : Actor[];
  movie: Movie;
  sub :any;

  constructor(private router: Router, private http: HttpClient,private route: ActivatedRoute ) {
    

  }

  getActors(){
    return this.http.get<Actor[]>('https://localhost:44325/api/actors');
  }
  

  getActor(id : Number){
    return this.http.get<Actor>('https://localhost:44325/api/actors/'+id.toString());
  }

  deleteActor(id : Number){
    return this.http.delete<Actor>('https://localhost:44325/api/Authenticate/'+id.toString()).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/actorlist']);
      }
    );
  }

  getActorsEdit(){
    return this.http.get<Actor[]>('https://localhost:44325/api/actors/Edit/');
  }

  addActor(movie: Movie) {

     this.http.post('https://localhost:44325/api/movies', movie).subscribe(
      res => {
        console.log(movie);
        console.log(res);
      }
    );

  }

  updateActorInfo(id: number, actor: Actor){
    var address = 'https://localhost:44325/api/Actors/'+id.toString();
    
     this.http.put<any>(address,actor).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/actorlist']);

      }
    );
  }

  NewActor ( actor : any){
    this.http.post<any>("https://localhost:44325/api/Actors/addnew",actor).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/actorlist']);
      }
    );
  }
}
