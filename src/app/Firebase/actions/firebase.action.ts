import { createAction, props } from '@ngrx/store';

export const setToken = createAction(
  '[AppComponent] Set Firebase Token',
  props<{ token: string }>()
);

export const resetToken = createAction('[AppComponent] Reset Firebase Token');
