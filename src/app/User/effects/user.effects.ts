import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { AuthService } from '../../Auth/services/auth.service';
import { SharedService } from '../../Shared/Services/shared.service';
import * as UserActions from '../actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  private responseOK: boolean;
  private errorResponse: any;

  addUserContact$: any;
  addUserContactSuccess$: any;
  addUserContactFailure$: any;

  deleteUser$: any;
  deleteUserSuccess$: any;
  deleteUserFailure$: any;

  deleteUserByUserId$: any;
  deleteUserByUserIdSuccess$: any;
  deleteUserByUserIdFailure$: any;

  getUser$: any;
  getUserFailure$: any;

  getUserByUserId$: any;
  getUserByUserIdFailure$: any;

  getUserContacts$: any;
  getUserContactsFailure$: any;

  getUsers$: any;
  getUsersFailure$: any;

  register$: any;
  registerSuccess$: any;
  registerFailure$: any;

  removeUserContact$: any;
  removeUserContactSuccess$: any;
  removeUserContactFailure$: any;

  updateUser$: any;
  updateUserSuccess$: any;
  updateUserFailure$: any;

  updateUserByUserId$: any;
  updateUserByUserIdSuccess$: any;
  updateUserByUserIdFailure$: any;

  updateUserDeviceToken$: any;
  updateUserDeviceTokenSuccess$: any;
  updateUserDeviceTokenFailure$: any;

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private store: Store,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.responseOK = false;

    this.addUserContact$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.addUserContact),
        exhaustMap(({ email }) =>
          this.userService.addUserContact(email).pipe(
            map(() => {
              return UserActions.deleteUserSuccess();
            }),
            catchError((error) => {
              return of(UserActions.deleteUserFailure({ payload: error }));
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'contactListFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.addUserContactSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.addUserContactSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.addUserContactFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.addUserContactFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.deleteUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUser),
        exhaustMap(() =>
          this.userService.deleteUser().pipe(
            map(() => {
              return UserActions.deleteUserSuccess();
            }),
            catchError((error) => {
              return of(UserActions.deleteUserFailure({ payload: error }));
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'profileFeedback',
                this.responseOK,
                this.errorResponse
              );
              if (this.responseOK) {
                this.authService.logout();
              }
            })
          )
        )
      );
    });

    this.deleteUserSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.deleteUserSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.deleteUserFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.deleteUserFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.deleteUserByUserId$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUserByUserId),
        exhaustMap(({ userId }) =>
          this.userService.deleteUserByUserId(userId).pipe(
            map(() => {
              return UserActions.deleteUserByUserIdSuccess({
                userId: userId
              });
            }),
            catchError((error) => {
              return of(
                UserActions.deleteUserByUserIdFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'userListFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.deleteUserByUserIdSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.deleteUserByUserIdSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.deleteUserByUserIdFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.deleteUserByUserIdFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.getUser),
        exhaustMap(() =>
          this.userService.getUser().pipe(
            map((user) => {
              return UserActions.getUserSuccess({
                user: user
              });
            }),
            catchError((error) => {
              return of(UserActions.getUserFailure({ payload: error }));
            })
          )
        )
      );
    });

    this.getUserFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.getUserFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getUserByUserId$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.getUserByUserId),
        exhaustMap(({ userId }) =>
          this.userService.getUserByUserId(userId).pipe(
            map((user) => {
              return UserActions.getUserByUserIdSuccess({
                userId: userId,
                user: user
              });
            }),
            catchError((error) => {
              return of(UserActions.getUserByUserIdFailure({ payload: error }));
            })
          )
        )
      );
    });

    this.getUserByUserIdFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.getUserByUserIdFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getUserContacts$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.getUserContacts),
        exhaustMap(() =>
          this.userService.getUserContacts().pipe(
            map((contacts) => {
              return UserActions.getUserContactsSuccess({
                contacts: contacts
              });
            }),
            catchError((error) => {
              return of(
                UserActions.getUserContactsFailure({
                  payload: error
                })
              );
            })
          )
        )
      );
    });

    this.getUserContactsFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.getUsersFailure),
          map((error) => {
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.getUsers$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.getUsers),
        exhaustMap(() =>
          this.userService.getUsers().pipe(
            map((users) => {
              return UserActions.getUsersSuccess({
                users: users
              });
            }),
            catchError((error) => {
              return of(
                UserActions.getUsersFailure({
                  payload: error
                })
              );
            })
          )
        )
      );
    });

    this.getUsersFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.getUsersFailure),
          map((error) => {
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.register$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.register),
        exhaustMap(({ user }) =>
          this.userService.register(user).pipe(
            map((user) => {
              return UserActions.registerSuccess({ user: user });
            }),
            catchError((error) => {
              return of(UserActions.registerFailure({ payload: error }));
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'registerFeedback',
                this.responseOK,
                this.errorResponse
              );

              if (this.responseOK) {
                this.router.navigateByUrl('landing');
              }
            })
          )
        )
      );
    });

    this.registerSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.registerSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.registerFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.registerFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.removeUserContact$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.removeUserContact),
        exhaustMap(({ email }) =>
          this.userService.removeUserContact(email).pipe(
            map((contact) => {
              return UserActions.removeUserContactSuccess({
                email: email,
                contact: contact
              });
            }),
            catchError((error) => {
              return of(
                UserActions.removeUserContactFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'userListFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.removeUserContactSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.deleteUserByUserIdSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.removeUserContactFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.removeUserContactFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.updateUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.updateUser),
        exhaustMap(({ user }) =>
          this.userService.updateUser(user).pipe(
            map((user) => {
              return UserActions.updateUserSuccess({
                user: user
              });
            }),
            catchError((error) => {
              return of(UserActions.updateUserFailure({ payload: error }));
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'profileFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.updateUserSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.updateUserSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.updateUserFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.updateUserFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.updateUserByUserId$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.updateUserByUserId),
        exhaustMap(({ userId, user }) =>
          this.userService.updateUserByUserId(userId, user).pipe(
            map((user) => {
              return UserActions.updateUserByUserIdSuccess({
                userId: userId,
                user: user
              });
            }),
            catchError((error) => {
              return of(
                UserActions.updateUserByUserIdFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'userFormFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.updateUserByUserIdSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.updateUserByUserIdSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.updateUserByUserIdFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.updateUserByUserIdFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );

    this.updateUserDeviceToken$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.updateUserDeviceToken),
        exhaustMap(({ device_token }) =>
          this.userService.updateUserDeviceToken(device_token).pipe(
            map((user) => {
              return UserActions.updateUserDeviceTokenSuccess({
                user: user
              });
            }),
            catchError((error) => {
              return of(
                UserActions.updateUserDeviceTokenFailure({ payload: error })
              );
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                'appFeedback',
                this.responseOK,
                this.errorResponse
              );
            })
          )
        )
      );
    });

    this.updateUserDeviceTokenSuccess$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.updateUserDeviceTokenSuccess),
          map(() => {
            this.responseOK = true;
          })
        );
      },
      { dispatch: false }
    );

    this.updateUserDeviceTokenFailure$ = createEffect(
      () => {
        return this.actions$.pipe(
          ofType(UserActions.updateUserDeviceTokenFailure),
          map((error) => {
            this.responseOK = false;
            this.errorResponse = error.payload.error;
            this.sharedService.errorLog(error.payload.error);
          })
        );
      },
      { dispatch: false }
    );
  }
}
