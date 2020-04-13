import {HasId} from '~/app/models/HasId';

export class MovieRating implements HasId {
    id: number;
    movie: number;
    user: number;
    stars: number;

}


