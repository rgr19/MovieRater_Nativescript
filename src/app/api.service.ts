import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie} from './models/Movie';
import {NewMovie} from './models/NewMovie';
import {getString} from '@nativescript/core/application-settings/application-settings';
import {Auth} from '~/app/models/Auth';
// no cookies in mobile app
// import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    @Input() movieRating: any = null;

    /* https://developer.android.com/studio/run/emulator-networking.html
    10.0.2.2	Special alias to your host loopback interface (i.e., 127.0.0.1 on your development machine)
     */

    baseUrl = 'http://10.0.2.2:8000/';
    apiUrl = this.baseUrl + 'api/';
    moviesUrl = this.apiUrl + 'movies/';
    signUpUrl = this.apiUrl + 'users/';
    signInUrl = this.baseUrl + 'auth/';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    buildAuthHeaders() {
        const token: string = Auth.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + `${token}`
        });
    }

    constructor(
        private httpClient: HttpClient
        // private cookieService: CookieService
    ) {
    }

    signInUser(authData) {
        const body = JSON.stringify(authData);
        return this.httpClient.post(this.signInUrl, body,
            {headers: this.headers}
        );
    }

    signUpUser(authData) {
        const body = JSON.stringify(authData);
        return this.httpClient.post(this.signUpUrl, body,
            {headers: this.headers}
        );
    }

    verifyToken() {
        return this.httpClient.get<boolean>(this.verifyTokenUrl(), {headers: this.buildAuthHeaders()});

    }

    getMovies() {
        return this.httpClient.get<Movie[]>(this.moviesUrl, {headers: this.buildAuthHeaders()});
    }

    getMovie(movieId: number) {
        return this.httpClient.get<Movie>(this.movieUrl(movieId), {headers: this.buildAuthHeaders()});
    }

    putMovie(movie: Movie) {
        const body = JSON.stringify(movie);
        return this.httpClient.put(this.movieUrl(movie.id), body, {headers: this.buildAuthHeaders()});
    }

    deleteMovie(movie: Movie) {
        const body = JSON.stringify(movie);
        return this.httpClient.delete(this.movieUrl(movie.id), {headers: this.buildAuthHeaders()});
    }

    postMovie(movie: NewMovie) {
        const body = JSON.stringify(movie);
        return this.httpClient.post(this.moviesUrl, body, {headers: this.buildAuthHeaders()});
    }

    rateMovie(movieId: number, movieRate: number) {
        const body = JSON.stringify({stars: movieRate});
        return this.httpClient.post(this.rateMovieUrl(movieId), body, {headers: this.buildAuthHeaders()});
    }

    movieUrl(movieId: number) {
        return `${this.moviesUrl}${movieId}/`;
    }

    rateMovieUrl(movieId: number) {
        return `${this.moviesUrl}${movieId}/rate_movie/`;
    }


    private verifyTokenUrl() {
        return `${this.baseUrl}/`;
    }
}
