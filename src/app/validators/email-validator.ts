/**
 * Created by adirz on 10/16/2016.
 */
import { AbstractControl } from '@angular/forms';

export class EmailValidator {

    static isValid(control: AbstractControl) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);

        if (re) {
            return null;
        }

        return {"invalidEmail": true};
    }
}