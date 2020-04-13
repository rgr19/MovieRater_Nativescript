import {Movie} from '~/app/models/Movie';
import {MovieRating} from '~/app/models/MovieRating';

export interface MovieRatingResponse {
    movieRating: MovieRating;
    action: string;
    status: string;
}
