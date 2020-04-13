import {Movie} from '~/app/models/Movie';

export interface MovieResponse {
    movie: Movie;
    action: string;
    status: string;
}
