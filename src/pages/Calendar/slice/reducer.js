import { BASE_SLICE_PATH } from "./constants";
import { createSliceReducer } from "../../../store/factory";

const defaultView = {
    isLoading: false,
    hasError: false,
    error: undefined,
    selectedDate: null
};

const defaultData = {
    weather: {},
    reminders: {}
};

export const initialState = {
    view: defaultView,
    data: defaultData
};

export default createSliceReducer(defaultView, defaultData, BASE_SLICE_PATH);