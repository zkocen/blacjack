import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { uiState } from './reducers';

const store = createStore(uiState, composeWithDevTools());

export default store;
