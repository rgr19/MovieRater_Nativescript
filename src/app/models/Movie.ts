import {HasId} from '~/app/models/HasId';

export class Movie implements HasId {
    static NEW_ID: number = -1;
    title: string = "New Movie";
    description: string;
    avg_rating: number = 0;
    no_of_ratings: number = 0;
    id: number = Movie.NEW_ID;

    isNew(): boolean {
        return Movie.isIdNew(this.id);
    }

    static isIdNew(id: number): boolean {
        return this.NEW_ID === id;
    }

}


