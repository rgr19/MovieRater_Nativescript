import {Component, OnInit} from '@angular/core';

import {Movie} from '~/app/models/Movie';
import {ApiService} from '~/app/api.service';
import {Router} from '@angular/router';
import {Auth} from '~/app/models/Auth';

@Component({
    selector: 'ns-movies',
    templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
    // moviesIndex: Set<number> = new Set<number>();
    // movies: Map<number, Movie> = new Map<number, Movie>();
    movies: Array<Movie>;
    selectedMovie = null;
    editedMovie: any;
    isLoading: boolean = true;

    constructor(
        private apiService: ApiService,
        private router: Router
    ) {
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    ngDoCheck() {
        console.log('NG DO CHECK');
        this.checkAuth();
    }

    checkAuth() {
        console.log('Main component check auth');
        const token = Auth.getToken();
        if (!token) {
            this.isLoading = true;
            this.goAuth();
        }
    }

    ngOnInit(): void {
        const token = Auth.getToken();
        console.log('Movies => on init => token: ', token);
        this.getMovies();
    }

    getMovies() {
        this.isLoading = true;
        console.log('NG ON INIT BEGIN');
        this.apiService.getMovies().subscribe(
            async (movies: Movie[]) => {
                await this.delay(100);
                this.movies = movies;
                this.isLoading = false;
            },
            error => console.log(error)
        );
        console.log('Main new movies: ', this.movies);
        console.log('NG ON INIT END, loading: ', this.isLoading);
    }

    newMovie() {
        this.router.navigate(['/edit', Movie.NEW_ID]);
    }

    goAuth() {
        this.router.navigate(['/auth']);

    }

    signOut() {
        Auth.cleanToken();
        this.isLoading = true;
    }
}
