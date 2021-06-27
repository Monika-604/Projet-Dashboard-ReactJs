import { 
    SET_LOGIN,
    SET_USER,
    SET_SERVICES,
    SET_RAIN,
    SET_CLIMATE,
    SET_TEMPRATURE,
    SET_CRYPTO,
    SET_FIAT
} from './type'


export const setLogin = (isLogin) => ({
    type: SET_LOGIN,
    payload: isLogin
})
export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})
export const setServices = (services) => ({
    type: SET_SERVICES,
    payload: services
})
export const setRain = (rain) => ({
    type: SET_RAIN,
    payload: rain
})
export const setClimate = (climate) => ({
    type: SET_CLIMATE,
    payload: climate
})
export const setTemprature = (temprature) => ({
    type: SET_TEMPRATURE,
    payload: temprature
})
export const setCrypto = (crypto) => ({
    type: SET_CRYPTO,
    payload: crypto
})
export const setFiat = (fiat) => ({
    type: SET_FIAT,
    payload: fiat
})





