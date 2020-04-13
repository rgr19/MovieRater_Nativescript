import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from '@nativescript/angular/router';
import {ActivatedRoute, Router} from '@angular/router';
import {Auth} from '~/app/models/Auth';
import {ApiService} from '~/app/api.service';
import {SnackBar} from 'nativescript-material-snackbar';

interface TokenObj {
    token: string;
}

@Component({
    selector: 'ns-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    static LOGIN: string = 'Login';
    static REGISTER: string = 'Register';
    isLoading: boolean = true;
    authMode: string = AuthComponent.LOGIN;
    protected auth: Auth;
    public isTokenValid: boolean = false;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private routerExtension: RouterExtensions
    ) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.auth = new Auth();
        this.checkAlreadyAuth();
    }

    async checkAlreadyAuth() {
        this.auth.reset();
        const token = Auth.getToken();
        if (token) {
            this.router.navigate(['/movies']);
        }
        await this.delay(100);
        this.isLoading = false;
    }

    swapMode() {
        if (this.isLoginMode()) {
            this.authMode = AuthComponent.REGISTER;
        } else if (this.isRegisterMode()) {
            this.authMode = AuthComponent.LOGIN;
        }
    }

    authenticate() {
        if (this.isRegisterMode()) {
            this.signUp();
        } else if (this.isLoginMode()) {
            this.signIn();
        }
    }

    signUp() {
        if (this.auth.username && this.auth.password) {
            Auth.cleanToken();
            console.log('Sign UP BEGIN with', this.auth);
            this.apiService.signUpUser(this.auth).subscribe(
                async (result) => {
                    this.isLoading = true;
                    await this.delay(1000);
                    this.isLoading = false;
                    console.log('Sign UP END with out: ', this.auth, result);
                    this.auth.saveUsername().savePassword();
                    this.authMode = AuthComponent.LOGIN;

                }, async failure => {
                    console.log('Sign UP END with error: ', this.auth, failure);
                    const snackBar = new SnackBar();
                    snackBar.simple("Registration failed with ERROR: " + JSON.stringify(failure.error));
                    await this.delay(1000);

                }
            );
            this.router.navigate(['/auth']);
        }
    }

    signIn() {
        if (this.auth.username && this.auth.password) {
            console.log('Sign IN BEGIN with', this.auth);
            this.apiService.signInUser(this.auth).subscribe(
                (result: TokenObj) => {
                    console.log('Sign IN END with out: ', this.auth, result);
                    this.auth
                        .setToken(result.token)
                        .saveToken()
                        .saveUsername()
                        .savePassword();
                    this.router.navigate(['/movies']);
                },
                async failure => {
                    console.log('Sign IN END with error: ', this.auth, failure);
                    const snackBar = new SnackBar();
                    snackBar.simple(JSON.stringify(failure.error));
                    // for (const msg of failure.error.non_field_errors) {
                    //     snackBar.simple(msg);
                    //     await this.delay(500);
                    // }
                    await this.delay(1000);

                }
            );
        }
    }


    isLoginMode() {
        return this.authMode === AuthComponent.LOGIN;
    }

    isRegisterMode() {
        return this.authMode === AuthComponent.REGISTER;
    }

    goBack() {

    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
