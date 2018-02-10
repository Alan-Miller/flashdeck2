import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.css';
import { unregister } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
