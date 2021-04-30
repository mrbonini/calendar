import { createSelector } from 'reselect';
import reducer from './reducer';

const selectDefault = (state) => state.calendar || reducer.initialState;

export const selectCalendarReminders = createSelector(
    [selectDefault],
    (state) => state.data.reminders
);

export const selectWeatherData = createSelector(
    [selectDefault],
    (state) => state.data.weather
);

export const selectView = createSelector(
    [selectDefault],
    (state) => state.view
);