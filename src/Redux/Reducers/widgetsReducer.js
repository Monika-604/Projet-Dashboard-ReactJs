import {
   SET_RAIN,
   SET_CLIMATE,
   SET_TEMPRATURE,
    SET_CRYPTO,
    SET_FIAT,
    SET_WIDGETS
} from '../Actions/type'

const initialState = {
    rain:null,
    climate:null,
    temprature:null,
    crypto:null,
    fiat:null,
    widgets:[]

}

const widgetsReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case SET_RAIN:
            return {
                ...state,
                rain: action.payload,
            }
        case SET_WIDGETS:
            return {
                ...state,
                widgets: action.payload,
            }
        case SET_CLIMATE:
            return {
                ...state,
                climate: action.payload,
            }
        case SET_TEMPRATURE:
            return {
                ...state,
                temprature : action.payload,
            }
        case SET_CRYPTO:
            return {
                ...state,
                crypto: action.payload,
            }
        case SET_FIAT:
            return {
                ...state,
                fiat: action.payload,
            }
        default:
            return state;
    }
}

export default widgetsReducer;