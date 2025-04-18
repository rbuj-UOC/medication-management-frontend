import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers';

const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserStateLoading = createSelector(
  selectUserState,
  (state) => {
    return state.loading;
  }
);

export const selectUser = createSelector(selectUserState, (state) => {
  return state.user;
});

export const selectUserForm = createSelector(selectUserState, (state) => {
  return state.userForm;
});

export const selectUserContacts = createSelector(selectUserState, (state) => {
  return state.contacts;
});

export const selectUserDeviceToken = createSelector(
  selectUserState,
  (state) => {
    return state.user.device_token;
  }
);

export const selectUsers = createSelector(selectUserState, (state) => {
  return state.users;
});
