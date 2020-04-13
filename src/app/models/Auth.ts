import {getString, setString, remove} from '@nativescript/core/application-settings/application-settings';

export class Auth {

    static USERNAME: string = 'USERNAME';
    static PASSWORD: string = 'PASSWORD';
    static TOKEN: string = 'TOKEN';

    username: string;
    password: string;
    token: string;

    constructor() {
        this.reset();
        console.log('Auth: user(%s) pass(%s) token(%s)', this.username, this.password, this.token);
    }

    static getToken() {
        return getString(Auth.TOKEN);
    }

    static cleanToken() {
        remove(Auth.TOKEN);
    }

    reset() {
        this.username = getString(Auth.USERNAME, null);
        this.password = getString(Auth.PASSWORD, null);
        this.token = getString(Auth.TOKEN, null);
    }

    setToken(t: string) {
        this.token = t;
        return this;

    }

    saveToken() {
        setString(Auth.TOKEN, this.token);
        return this;
    }

    savePassword() {
        setString(Auth.PASSWORD, this.password);
        return this;
    }

    saveUsername() {
        setString(Auth.USERNAME, this.username);
        return this;
    }
}
