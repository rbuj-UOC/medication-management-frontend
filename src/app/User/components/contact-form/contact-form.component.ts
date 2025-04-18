import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserAction from '../../actions';

@Component({
  selector: 'app-contact-form',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isValidForm: boolean | null;
  email: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.isValidForm = null;
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);
    this.contactForm = this.fb.group({
      email: this.email
    });
  }

  ngOnInit(): void {
    this.contactForm.reset();
  }

  cancelContact() {
    this.router.navigateByUrl('/user/contact/list');
  }

  saveContact(): void {
    this.isValidForm = false;
    if (this.contactForm.invalid) {
      return;
    }
    this.isValidForm = true;
    const contact = this.contactForm.value;
    this.store.dispatch(UserAction.addUserContact({ email: contact.email }));
  }
}
