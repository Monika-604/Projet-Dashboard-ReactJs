import { createStore, applyMiddleware, compose } from 'redux'
// import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from '../Reducers'

const middleWare = [ thunk ]

//delete this line for release
// middleWare.push(createLogger())

const store = createStore (
    reducers,
    undefined,
    compose(
        applyMiddleware(...middleWare)
    )
)
export default store;