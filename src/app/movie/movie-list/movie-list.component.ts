import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movie: Movie[];
  movies: any;
  subscription: Subscription;

  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.activeRoute.url.subscribe(params => {
        this.ngOnInit();
    });

}

  ngOnInit() {

    this.movieService.getMovies().subscribe(
      res => {
        this.movies = res;
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  }

  onNewMovie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSelected(id: number){

   
    this.router.navigate([id.toString()], {relativeTo: this.route});

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
