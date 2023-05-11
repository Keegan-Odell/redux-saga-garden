import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';

import App from './App';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

const sagaMiddleware = createSagaMiddleware();

const plantList = (state = [], action) => {
	switch (action.type) {
		case 'ADD_PLANT':
			return [...state, action.payload];
		default:
			return state;
	}
};

function* fetchPlants() {
	try {
		const response = yield axios({
			method: 'GET',
			url: '/api/plant',
		});
		const thePlants = response.data;
		console.log(thePlants);
		yield put({
			type: 'ADD_PLANT',
			payload: thePlants,
		});
	} catch (error) {
		console.log(error);
	}
}

function* rootSaga() {
	yield takeLatest('SAGA/FETCH_PLANTS', fetchPlants);
}

const store = createStore(
	combineReducers({ plantList }),
	applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
