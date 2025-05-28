import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-register',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  alias: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  role: FormControl;
  legal: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;
  roles: { value: string; label: string }[];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.registerUser = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.surname_1 = new FormControl(this.registerUser.surname_1, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.surname_2 = new FormControl(this.registerUser.surname_2, [
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.alias = new FormControl(this.registerUser.alias, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.birth_date = new FormControl(
      formatDate(this.registerUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8)
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.validateSamePassword
    ]);

    this.legal = new FormControl('', [Validators.requiredTrue]);

    this.role = new FormControl(this.registerUser.role, [Validators.required]);
    this.roles = [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' }
    ];

    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: this.role,
      legal: this.legal
    });
  }

  register(): void {
    this.isValidForm = false;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    const user: UserDTO = {
      name: this.registerUser.name,
      surname_1: this.registerUser.surname_1,
      surname_2: this.registerUser.surname_2,
      alias: this.registerUser.alias,
      birth_date: this.registerUser.birth_date,
      email: this.registerUser.email,
      password: this.registerUser.password,
      role: this.registerUser.role
    };

    this.store.dispatch(UserAction.register({ user }));
  }

  private validateSamePassword(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');
    return password?.value == confirmPassword?.value
      ? null
      : { PasswordNoMatch: true };
  }
}
