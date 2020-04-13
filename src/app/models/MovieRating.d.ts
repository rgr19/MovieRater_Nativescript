import {HasId} from '~/app/models/HasId';

export interface MovieRating extends HasId {
    id: number;
    movie: number;
    user: number;
    stars: number;

}


