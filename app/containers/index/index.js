
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import App from './app';
import reducers from './reducers';


const AppComponent = () => {

	const reducer = combineReducers(reducers);
	const store = createStore(reducer);

	render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('app')
	)

};

document.addEventListener("DOMContentLoaded", () => new AppComponent());





