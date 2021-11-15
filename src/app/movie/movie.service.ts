import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { map, tap, take, exhaustMap } from 'rxjs/operators';



import { Movie } from './movie.model';
import { Actor } from './actor.model';
import { FormsModule } from '@angular/forms';
import { ReturnStatement } from '@angular/compiler';
//import { Ingredient } from '../shared/ingredient.model';
//import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class MovieService {
  movieChanged = new Subject<Movie[]>();

  casts : Actor[];
  movie: Movie;
  sub :any;

  constructor(private http: HttpClient ) {}

  getNextMovieID(){
    return this.http.get('https://localhost:44325/api/movies/NextId');
  }
  
  getMovies(){
    return this.http.get('https://localhost:44325/api/movies');
  }

  getMovie(id: number) {
    return this.http.get<Movie>('https://localhost:44325/api/movies/'+id.toString());

  }

  getMovieCast(id: number) {
    return this.http.get<Actor[]>('https://localhost:44325/api/link/cast/'+id.toString());
  }

  getMovieEdit(id: number):Observable<Movie> {
   return this.http.get<Movie>('https://localhost:44325/api/movies/'+id.toString())
  }

  getMovieCastEdit(id: number) {
     this.http.get<Actor[]>('https://localhost:44325/api/link/cast/'+id.toString()).subscribe(
      res => {
        this.casts = res;
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );

    return this.casts;
  }

  getActors(){
    return this.http.get<Actor[]>('https://localhost:44325/api/actors');
  }

  addMovie(movie: Movie) {

     this.http.post('https://localhost:44325/api/movies', movie).subscribe(
      res => {
        console.log(movie);
        console.log(res);
      }
    );

  }

  updateMovie(id: number, movie: Movie) {

    var address = 'https://localhost:44325/api/movies/'+id.toString();
    

     this.http.put(address,movie).subscribe(
      res => {
        console.log(res);
        console.log(JSON.stringify(movie));
      }
    );
  }

  deleteMovie(id: number) {
    return this.http.delete('https://localhost:44325/api/movies/'+id.toString()).subscribe(
      res => {
        console.log(res);
      }
    );

  }
}
