import React from 'react'
import Timer from '../components/Timer'
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {TimerReducer} from '../reducers/TimerReducer'

const rootReducer = combineReducers({
    timerStore: TimerReducer, 
})

const store = createStore(rootReducer)

const Container = ({history}) => 
    <Provider store={store}>
        <Timer/>
    </Provider>


export default Container