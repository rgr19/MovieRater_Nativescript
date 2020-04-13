import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '~/app/models/Movie';
import {ApiService} from '~/app/api.service';
import {RouterExtensions} from '@nativescript/angular/router';
import {MovieRatingResponse} from '~/app/models/MovieRatingResponse';


@Component({
    selector: 'ns-movie-details',
    templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit {
    movie: Movie;
    isLoading: boolean;
    rateHovered: number = 0;

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
        this.getMovieDetails(+this.route.snapshot.params.id);
    }

    rateSubmit(rate: number) {
        this.rateHovered = rate;
        this.apiService.rateMovie(this.movie.id, this.rateHovered).subscribe(
            (output: MovieRatingResponse) => {
                console.log('Rate movie result: ', output);
                if (this.movie.id === output.movieRating.movie) {
                    this.getMovieDetails(output.movieRating.movie);
                } else {
                    console.error('Rate movie: bad response: expected(%s), received(%s)', this.movie, output.movieRating.movie);
                }
            },
            error => {
                console.log('Rate movie error: ', error);
            }
        );
    }


    editClicked() {
        this.router.navigate(['/edit', this.movie.id]);
    }

    deleteMovie() {
        this.apiService.deleteMovie(this.movie).subscribe(
            data => {
                this.goMain();
            },
            error => console.log('Delete movie END, error: ', error)
        );
    }

    goBack() {
        this.routerExtension.backToPreviousPage();
    }

    goMain() {
        this.goTo('/movies');
    }

    goTo(...route: any[]) {
        this.router.navigate(route);
    }

    getMovieDetails(id: number) {
        this.apiService.getMovie(id).subscribe(
            async (m: Movie) => {
                console.log('before delay');

                await this.delay(50);
                this.movie = m;
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

}
