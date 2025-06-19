import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SchedulesState } from '../reducers';

const selectSchedulesState = createFeatureSelector<SchedulesState>('schedules');

export const selectConfirmations = createSelector(
  selectSchedulesState,
  (state) => {
    return state.confirmations;
  }
);

export const selectScheduleStateLoading = createSelector(
  selectSchedulesState,
  (state) => {
    return state.loading;
  }
);

export const selectSchedule = createSelector(selectSchedulesState, (state) => {
  return state.schedule;
});

export const selectScheduleId = createSelector(
  selectSchedulesState,
  (state) => {
    return state.schedule.id;
  }
);

export const selectSchedules = createSelector(selectSchedulesState, (state) => {
  return state.schedules;
});

export const selectToday = createSelector(selectSchedulesState, (state) => {
  return state.today;
});
