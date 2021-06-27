import {
    SET_LOGIN,
    SET_USER,
    SET_SERVICES
} from '../Actions/type'

const initialState = {
    isLoging: localStorage.getItem('jwt') ? true : false,
    user:{},
    services:[]
}

const Signup_Reducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case SET_LOGIN:
            return {
                ...state,
                isLoging: action.payload,
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case SET_SERVICES:
            return {
                ...state,
                services: action.payload,
            }
        default:
            return state;
    }
}

export default Signup_Reducer;