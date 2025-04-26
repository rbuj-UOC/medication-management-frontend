import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';
import { selectUser } from '../../selectors';
@Component({
  selector: 'app-user-form',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  alias: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  role: FormControl;

  userForm: FormGroup;
  isValidForm: boolean | null;
  roles: { value: string; label: string }[];

  private userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.user = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.user.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)
    ]);

    this.surname_1 = new FormControl(this.user.surname_1, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.surname_2 = new FormControl(this.user.surname_2, [
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.alias = new FormControl(this.user.alias, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);

    this.birth_date = new FormControl(
      formatDate(this.user.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new FormControl(this.user.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.password = new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(8)
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.validateSamePassword
    ]);

    this.role = new FormControl(this.user.role, [Validators.required]);
    this.role.disable();
    this.roles = [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' }
    ];

    this.userForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password
    });

    this.store.select(selectUser).subscribe((user) => {
      this.user = user;

      this.name.setValue(this.user.name);
      this.surname_1.setValue(this.user.surname_1);
      this.surname_2.setValue(this.user.surname_2);
      this.alias.setValue(this.user.alias);
      this.birth_date.setValue(
        formatDate(this.user.birth_date, 'yyyy-MM-dd', 'en')
      );
      this.email.setValue(this.user.email);
      this.role.setValue(this.user.role);

      this.userForm = this.formBuilder.group({
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
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.store.dispatch(UserAction.getUserByUserId({ userId: this.userId }));
    }
  }

  onSubmit(): void {
    this.isValidForm = false;

    if (this.userForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.user = this.userForm.value;

    if (this.userId) {
      this.store.dispatch(
        UserAction.updateUserByUserId({ userId: this.userId, user: this.user })
      );
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
