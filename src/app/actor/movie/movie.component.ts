import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Movie } from 'src/app/movie/movie.model';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies : any

  constructor(private service: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.activeRoute.url.subscribe(params => {
        this.ngOnInit();
    });

}

  ngOnInit(): void {

    this.service.getUserMovie().subscribe(
      res => {
        this.movies = res;
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );

  }

}
