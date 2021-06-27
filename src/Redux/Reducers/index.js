import { combineReducers } from 'redux'

import userDetail from './signupReducer';
import widgets from './widgetsReducer';

export default combineReducers({
    userDetail,
    widgets
})