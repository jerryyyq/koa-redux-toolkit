import React from 'react'
import { Router, hashHistory, browserHistory, useRouterHistory } from 'react-router'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { createHashHistory } from 'history'
// import { syncHistoryWithStore } from 'react-router-redux'

import global_store from './app-store'
import appRoutes from './client-routes'

import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

// ========================================================
// Developer Tools Setup
// ========================================================
// console.log( "__DEBUG__ = " + process.env.__DEBUG__ )
// if (__DEBUG__) {
if (window.devToolsExtension)
    window.devToolsExtension.open()
// }

// ========================================================
// Store and History Instantiation
// ========================================================
const initialState = { cccc: 1, cddd: 2 }

let RootReducer = (state = {}, action) => state
global_store.add_global_reducer('root-reducer', RootReducer)

console.log('befor create_store, global_store = ', global_store)
global_store.create_store(RootReducer, initialState)
var appStore = global_store.store
console.log('after create_store, global_store.store = ', appStore)

const appHistory = browserHistory   //hashHistory
// const appHistory = useRouterHistory(createHistory)({ basename: __BASENAME__ })
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

// render
        // <Router history={appHistory} routes={appRoutes(appStore)} />

const muiTheme = getMuiTheme({
    palette: {accent1Color: deepOrange500}
})
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={appStore} key='yyq-s' >
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router history={appHistory} routes={appRoutes(appStore)} />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)

