import {
    SET_USER,
    SET_LOGIN,
    SET_RAIN,
    SET_CLIMATE,
    SET_TEMPRATURE,
    SET_CRYPTO,
    SET_FIAT,
    SET_WIDGETS
} from '../Redux/Actions/type';
import agent from './agent'
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

export function loginUser(user) {
    return {
        type: SET_LOGIN,
        payload: user
    }
}




// login
export const singin = (email, password) => {
    return async function (dispatch) {
        try {
            const response = await agent.User.login(email, password);
            return response
         
        } catch (error) {
            throw error
        }
    }
}


export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}
export const fetchWidgets = () => {
    return async function (dispatch) {
        try {
            const response = await agent.User.widgets();
            dispatch({
                type: SET_WIDGETS,
                payload: response
            })

        } catch (error) {
            throw error
        }
    }
}

// login
export const fetchTemprature = (city) => {
    return async function (dispatch) {
        try {
            const response = await agent.User.temperature(city);
            dispatch({
                type: SET_TEMPRATURE,
                payload: response
            })

        } catch (error) {
            throw error
        }
    }
}
export const fetchClimate = (city) => {
    return async function (dispatch) {
        try {
            const response = await agent.User.climate(city);
            dispatch({
                type: SET_CLIMATE,
                payload: response
            })


        } catch (error) {
            throw error
        }
    }
}
export const fetchRainfall = (city) => {
    return async function (dispatch) {
        try {
            const response = await agent.User.rainfall(city);
            dispatch({
                type: SET_RAIN,
                payload: response
            })

        } catch (error) {
            throw error
        }
    }
}

export const fetchCrypto = () => {
    return async function (dispatch) {
        try {
            const response = await agent.User.crypto();
            dispatch({
                type: SET_CRYPTO,
                payload: response
            })

        } catch (error) {
            throw error
        }
    }
}
export const fetchFiat = () => {
    return async function (dispatch) {
        try {
            const response = await agent.User.fiat();
            dispatch({
                type: SET_FIAT,
                payload: response
            })

        } catch (error) {
            throw error
        }
    }
}