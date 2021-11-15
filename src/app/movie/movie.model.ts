//import { Ingredient } from '../shared/ingredient.model';
import { ActorMovieLink } from "./actormovielink.model";

export class Movie {
  public id: number;
  public mname: string;
  public duration: number;
  public genre: string;
  public releasedate: Date;
  public rating: number;
  public description: string;
  public photo: string;
  public MovieActorLinks : ActorMovieLink[]


  constructor(id: number, mname: string, duration: number,genre: string,releasedate: Date,rating: number , description : string , photo : string) {
    this.id = id;
    this.mname = mname;
    this.duration = duration;
    this.genre = genre;
    this.releasedate = releasedate;
    this.rating = rating;
    this.photo = photo;
    this.description = description;
  }
}
