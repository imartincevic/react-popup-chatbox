import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import PubSub, { PubSubContext } from './pubsub';
import App from './components/App';
import { newMessage } from './actions/messages';
import './index.scss';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log('store.getstate()', store.getState());
store.subscribe( () => console.log('store.getstate()', store.getState()) );

const pubsub = new PubSub();

pubsub.addListener({
    message: messageObject => {
        const { message, channel } = messageObject;

        console.log('received message', message, 'channel', channel);

        store.dispatch(message);
    }
})

// setTimeout(() => {
//     pubsub.publish(newMessage({ text: 'Hello world!', username: 'Bob'}));
// }, 1000)

ReactDOM.render(
    <Provider store={store}>
        <PubSubContext.Provider value={{ pubsub }}>
            <App />
        </PubSubContext.Provider>
    </Provider>,
    document.getElementById('root')
);