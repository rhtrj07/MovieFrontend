import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movie: Movie[];
  movies: any;
  subscription: Subscription;
  isRoleIn$: Observable<string>;


  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private service : UserService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.activeRoute.url.subscribe(params => {
        this.ngOnInit();
    });

}

  ngOnInit() {

    this.service.Start();
    this.isRoleIn$ = this.service.isRoleIn;

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

}
