import { combineReducers} from 'redux';
import calendar from '../pages/Calendar/slice/reducer';

const reducers = {
    calendar
};

export default combineReducers(reducers);