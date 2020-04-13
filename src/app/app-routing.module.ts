import {NgModule} from '@angular/core';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {Router, Routes} from '@angular/router';

import {MoviesComponent} from './movies/movies.component';
import {MovieDetailsComponent} from './movies/movie-details/movie-details.component';
import {MovieFormComponent} from '~/app/movies/movie-form/movie-form.component';
import {AuthComponent} from '~/app/auth/auth.component';
import {Auth} from '~/app/models/Auth';
import {getString} from '@nativescript/core/application-settings/application-settings';

const routes: Routes = [
    {path: '', redirectTo: '/auth', pathMatch: 'full'},
    {path: 'auth', component: AuthComponent},
    {path: 'movies', component: MoviesComponent},
    {path: 'movie/:id', component: MovieDetailsComponent},
    {path: 'edit/:id', component: MovieFormComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {


}
