import { formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
export class ProfileComponent implements OnInit {
  store = inject(Store);
  selectUser$: Observable<UserDTO | null> = this.store.select(selectUser);

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
  roles: { value: string; label: string }[];

  constructor(private formBuilder: FormBuilder) {
    this.isValidForm = null;

    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)
    ]);

    this.surname_1 = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.surname_2 = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.alias = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.birth_date = new FormControl(
      formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.validateSamePassword
    ]);

    this.role = new FormControl('', [Validators.required]);
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
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: this.role
    });
  }

  ngOnInit(): void {
    this.selectUser$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue({
          name: user.name,
          surname_1: user.surname_1,
          surname_2: user.surname_2,
          alias: user.alias,
          birth_date: formatDate(user.birth_date, 'yyyy-MM-dd', 'en'),
          email: user.email,
          role: user.role
        });
      }
    });
    this.store.dispatch(UserAction.getUser());
  }

  onSubmit(): void {
    this.isValidForm = false;
    if (this.profileForm.invalid) {
      return;
    }
    this.isValidForm = true;
    const user = this.profileForm.value;
    delete user.confirmPassword;
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
