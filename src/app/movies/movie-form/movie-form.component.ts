import {Component, OnInit} from '@angular/core';
import {Movie} from '~/app/models/Movie';
import {ApiService} from '~/app/api.service';
import {RouterExtensions} from '@nativescript/angular/router';
import {ActivatedRoute, Router} from '@angular/router';
import {Auth} from '~/app/models/Auth';
import { getString } from '@nativescript/core/application-settings/application-settings';

@Component({
    selector: 'ns-movie-form',
    templateUrl: './movie-form.component.html',
    styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
    isLoading: boolean = true;
    movie: Movie;
    movieTitle: string;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private routerExtension: RouterExtensions
    ) {
    }

    ngDoCheck() {
        console.log('NG DO CHECK');
        // this.checkAuth();
    }


    ngOnInit(): void {
        this.isLoading = true;
        const movieId = +this.route.snapshot.params.id;
        if (Movie.isIdNew(movieId)) {
            this.setNewMovieDetails();
        } else {
            this.getMovieDetails(movieId);
        }
    }

    setNewMovieDetails() {
        this.movie = new Movie();
        this.isLoading = false;
    }

    updateMovie() {
        console.log('Save movie form BEGIN, input: ', this.movie);
        if (this.movie.isNew()) {
            this.apiService.postMovie(this.movie).subscribe(
                (result: Movie) => {
                    console.log('Save movie form END, post out: ', result);
                    this.goMain();
                },
                error => console.log('Save movie form END, post error:', error)
            );
        } else {
            this.apiService.putMovie(this.movie).subscribe(
                (result: Movie) => {
                    console.log('Save movie form END, put out: ', result);
                    this.goMovieDetails();
                },
                error => console.log('Save movie form END, put error:', error)
            );
        }
    }

    goMovieDetails() {
        this.goTo('/movie', this.movie.id);
    }

    goMain() {
        this.goTo('/movies');
    }

    goTo(...route: any[]) {
        this.router.navigate(route);
    }

    goBack() {
        this.routerExtension.back();
    }

    getMovieDetails(id: number) {
        this.apiService.getMovie(id).subscribe(
            async (m: Movie) => {
                console.log('before delay');
                await this.delay(10);
                this.movie = m;
                this.movieTitle = m.title;
                this.isLoading = false;

                // Do something after
                console.log('after delay');
            },
            error => {
                console.log('Item details -> ngOnInit -> error: ', error);
            }
        );
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    deleteMovie() {
        this.apiService.deleteMovie(this.movie).subscribe(
            data => {
                this.goMain();
            },
            error => console.log('Delete movie END, error: ', error)
        );
    }
}
