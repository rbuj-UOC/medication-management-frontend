import { Action, createReducer, on } from '@ngrx/store';
import * as DisplayActions from '../actions';

export interface DisplayState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const initialState: DisplayState = {
  isMobile: true,
  isTablet: false,
  isDesktop: false
};

export const _displayReducer = createReducer(
  initialState,
  on(
    DisplayActions.setIsMobile,
    (): DisplayState => ({
      isMobile: true,
      isTablet: false,
      isDesktop: false
    })
  ),
  on(
    DisplayActions.setIsTablet,
    (): DisplayState => ({
      isMobile: false,
      isTablet: true,
      isDesktop: false
    })
  ),
  on(
    DisplayActions.setIsDesktop,
    (): DisplayState => ({
      isMobile: false,
      isTablet: false,
      isDesktop: true
    })
  )
);

export function displayReducer(
  state: DisplayState | undefined,
  action: Action
): DisplayState {
  return _displayReducer(state, action);
}
