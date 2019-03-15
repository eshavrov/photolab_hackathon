import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ConnectionManager from './ConnectionManager';
import './game';

const host = window.location.hostname;
const uri = `ws://${host}:8081`;

const connectionManager = new ConnectionManager();
connectionManager.connect(uri);

ReactDOM.render(<App connectionManager={connectionManager} />, document.getElementById('root'));

serviceWorker.unregister();
