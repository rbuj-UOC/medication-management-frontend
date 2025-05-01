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
import { selectUserRole } from '../../../Auth/selectors';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';
import { selectUser } from '../../selectors';
@Component({
  selector: 'app-profile',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  alias: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  role: FormControl;

  profileForm: FormGroup;
  isValidForm: boolean | null;
  isAdmin: boolean | null;
  roles: { value: string; label: string }[];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.profileUser = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.profileUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)
    ]);

    this.surname_1 = new FormControl(this.profileUser.surname_1, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.surname_2 = new FormControl(this.profileUser.surname_2, [
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.alias = new FormControl(this.profileUser.alias, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.birth_date = new FormControl(
      formatDate(this.profileUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new FormControl(this.profileUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.password = new FormControl(this.profileUser.password, [
      Validators.required,
      Validators.minLength(8)
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.validateSamePassword
    ]);

    this.role = new FormControl(this.profileUser.role, [Validators.required]);
    this.role.disable();
    this.roles = [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' }
    ];

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password
    });

    this.store.select(selectUserRole).subscribe((user_role) => {
      if (user_role) {
        this.isAdmin = user_role === 'admin';
      }
    });

    this.store.select(selectUser).subscribe((user) => {
      this.profileUser = user;

      this.name.setValue(this.profileUser.name);
      this.surname_1.setValue(this.profileUser.surname_1);
      this.surname_2.setValue(this.profileUser.surname_2);
      this.alias.setValue(this.profileUser.alias);
      this.birth_date.setValue(
        formatDate(this.profileUser.birth_date, 'yyyy-MM-dd', 'en')
      );
      this.email.setValue(this.profileUser.email);
      this.role.setValue(this.profileUser.role);
    });

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: this.role
    });
  }

  onSubmit(): void {
    this.isValidForm = false;
    if (this.profileForm.invalid) {
      return;
    }
    this.isValidForm = true;
    this.profileUser = this.profileForm.value;
    const { confirmPassword, ...user } = this.profileForm.value;
    this.store.dispatch(UserAction.updateUser({ user }));
  }

  onDelete(): void {
    const result = confirm('Confirm delete usr account');
    if (result) {
      this.store.dispatch(UserAction.deleteUser());
    }
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
