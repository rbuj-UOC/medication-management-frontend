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
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserAction from '../../actions';
import { selectUserForm } from '../../selectors';

@Component({
  selector: 'app-user-form',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  store = inject(Store);
  selectUser$ = this.store.select(selectUserForm);

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
    private formBuilder: FormBuilder
  ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isValidForm = null;

    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
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

    this.selectUser$.subscribe((user) => {
      if (user) {
        this.userForm.patchValue({
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
  }

  ngOnInit(): void {
    if (this.userId) {
      this.store.dispatch(
        UserAction.getUserFormByUserId({ userId: this.userId })
      );
    }
  }

  onSubmit(): void {
    this.isValidForm = false;
    if (this.userForm.invalid) {
      return;
    }
    this.isValidForm = true;
    const user = this.userForm.value;
    delete user.confirmPassword;
    if (this.userId) {
      this.store.dispatch(
        UserAction.updateUserFormByUserId({
          userId: this.userId,
          userForm: user
        })
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
