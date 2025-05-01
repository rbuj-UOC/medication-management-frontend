import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DisplayState } from '../reducers';

const selectDisplayState = createFeatureSelector<DisplayState>('display');

export const selectDisplayIsMobile = createSelector(
  selectDisplayState,
  (state) => {
    return state.isMobile;
  }
);

export const selectDisplayIsTablet = createSelector(
  selectDisplayState,
  (state) => {
    return state.isTablet;
  }
);

export const selectDisplayIsDesktop = createSelector(
  selectDisplayState,
  (state) => {
    return state.isDesktop;
  }
);
