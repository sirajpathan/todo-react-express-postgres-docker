import { createStore, applyMiddleware } from 'redux';
// import { syncHistoryWithStore} from 'react-router-redux';
// import { browserHistory } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';
import mySaga from '../saga/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(mySaga);

// export const history = syncHistoryWithStore(browserHistory, store);
// console.log(history)
export default store;
