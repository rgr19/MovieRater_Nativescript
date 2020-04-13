import {HasId} from '~/app/models/HasId';

export interface Movie extends HasId {
  title: string;
  description: string;
  avg_rating: number;
  no_of_ratings: number;
}

