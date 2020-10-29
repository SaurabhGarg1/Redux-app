import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { Action, createStore, combineReducers, Store, applyMiddleware } from 'redux';
import { EpicMiddleware, createEpicMiddleware, Options, combineEpics } from 'redux-observable';

import { appEpic, EpicDependencies } from './Epics';
import { State, TableState } from  './common';
import { tableReducer } from './Reducers';
import { ApplicationActionTypes } from './Actions';
import { ajax } from 'rxjs/ajax';
import { ApplicationContainer } from './Containers/applicationContainer';



const createApplicationMiddleware = () : EpicMiddleware<Action, Action, State, EpicDependencies> => {
	const dependencies = {
		getJSON : ajax.getJSON,
	}
	const options : Options = { dependencies }
	return createEpicMiddleware( options )
}

const createStoreWithMiddleware = (
	tableReducer : (state: TableState, action : ApplicationActionTypes ) => TableState | null,
	) : Store<State> => {
	const epicMiddleware = createApplicationMiddleware();
	const store = createStore(
		combineReducers({table : tableReducer}), applyMiddleware(epicMiddleware));
	epicMiddleware.run(combineEpics(appEpic));
	return store;
}

const store = createStoreWithMiddleware(tableReducer);

ReactDOM.render(
 <Provider store={store}>
     <ApplicationContainer />
     </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
