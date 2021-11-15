import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  [x: string]: any;

  actors: any;
  movies:Movie;
  id: number;
  showMyContainer: boolean = false;


  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router,
              private activeRoute: ActivatedRoute) {
                this.activeRoute.paramMap.subscribe(params => {
                  this.ngOnInit();
              });

  }
  

  ngOnInit() {

    
      // do something with the query params
    

  //   this.sub=this._Activatedroute.paramMap.subscribe(params => { 
  //     console.log(params);
  //      this.id = params.get('id'); 
  //      this.movie=this.movieService.getMovie(this.id);
  //      this.movie=this.movie.find(p => p.id==this.id);    
  //  });

    
  
    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );

      this.movieService.getMovie(this.id).subscribe(
        res => {
          this.movies = res;
          console.log(res);
        },
        err => {
          console.log(err);
        },
      );

      this.movieService.getMovieCast(this.id).subscribe(
        res => {
          this.actors = res;
          console.log(res);
        },
        err => {
          console.log(err);
        },
      );
      console.log(this.movie);
  }


  onEditMovie() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteMovie() {
    if(confirm("Are you sure to delete the movie")) {
      this.movieService.deleteMovie(this.id);
      this.router.navigate(['/movie']);
    }
  }

  onBack(): void {
    this._router.navigate(['movie']);
 }
 
}
