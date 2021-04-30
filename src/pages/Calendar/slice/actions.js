import { BASE_SLICE_PATH } from "./constants";
import Axios from 'axios';
import { createSliceBasicActions } from "../../../store/factory";
const API_KEY = process.env.REACT_APP_API_KEY;

const API_PATH = 'https://api.openweathermap.org/data/2.5/weather';

const getResource = async (city, tempScale) => 
    Axios.get(`${API_PATH}?id=${city}&appid=${'f9e9df8221ece19ba572d145e5175be0'}&units=${tempScale}`);

const { controlView, controlData } = createSliceBasicActions(BASE_SLICE_PATH)

export { controlView, controlData };

export const getWeatherData = (city, tempScale) => async dispatch => {
    try {
        dispatch(controlView({ isLoading: true }));

        const { data, status } = await getResource(city, tempScale);
        if ( status === 200 ) {
            dispatch(controlData({ weather: {...data.weather[0], ...data.main} }));
            dispatch(controlView({ isLoading: false }));
        };
    } catch (err) {
        dispatch(controlView({
            isLoading: false,
            hasError: true, 
            error: err.message || 'It wasnt possible to load the weather data. Please try again later'
        }))
    }
};