//import { Ingredient } from '../shared/ingredient.model';

export class ActorMovieLink {
  public Actorid: number;
  public Movieid: number;
  

  constructor(Actorid: number, Movieid: number) {
    this.Actorid = Actorid;
    this.Movieid = Movieid;
  }
}
