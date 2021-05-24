import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import {
    pushPopup
} from './redux/popupSlice';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
    onUpdate: registration => {
        store.dispatch(pushPopup("PopupUpdateAvailable"));
        if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
    }
});
