import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';

import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  [x: string]: any;

  isRoleIn$: Observable<string>;

  actors: any;
  movies:Movie;
  id: number;
  showMyContainer: boolean = false;


  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private service : UserService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
                this.activeRoute.paramMap.subscribe(params => {
                  this.ngOnInit();
              });

  }
  

  ngOnInit() {

    this.isRoleIn$ = this.service.isRoleIn;
  
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
