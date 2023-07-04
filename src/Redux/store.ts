import { Store } from 'redux'
import { createStore, combineReducers } from 'redux'
import titleState from './Store/Title'


const rootReducer = combineReducers({
    titleState
});

const store: Store = createStore(rootReducer);
export default store;