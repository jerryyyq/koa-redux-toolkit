
import { Router, Route, Link, hashHistory, useRouterHistory } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//import { createHashHistory } from 'history'
//import { syncHistoryWithStore } from 'react-router-redux'

import classes from './app-style.scss'

import global_store from './app-store'
import CreateCounter from './Counter/counter-module'
//import CreateLogin from './Login/login-module'

// ========================================================
// Developer Tools Setup
// ========================================================
//console.log( "__DEBUG__ = " + process.env.__DEBUG__ )
//if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
//}

// ========================================================
// Store and History Instantiation
// ========================================================
const initialState = { cccc: 1, cddd: 2 }

let RootReducer = (state = {}, action) => state;
global_store.add_global_reducer("root-reducer", RootReducer)

console.log("befor create_store, global_store = ", global_store);
global_store.create_store(RootReducer, initialState)
var appStore = global_store.store
console.log("after create_store, global_store.store = ", appStore);

const MainContainer = ({ children }) => (
  <div>
    <h1>yangyuqi's mysql-koa-react-redux toolkit</h1>
    <p><Link to="/">Home</Link></p>
    <p><Link to="/counter">Counter</Link></p>
    <p><Link to="/login">Login</Link></p>
    <div className={classes.mainContainer}>
        { children }
    </div>
  </div>
)

MainContainer.propTypes = {
  children: React.PropTypes.element.isRequired
}

const Welcome = () => (
    <h1>Welcome to yangyuqi's mysql-koa-react-redux world!</h1>
)

/*
const appRoutes = (store) => ({
  path: '/',
  component: MainContainer,
  indexRoute: Welcome,
  childRoutes: [
    CounterRoute(store)
//    LoginRoute(store),
  ]
})
*/


let Counter = CreateCounter(appStore);

const appRoutes = <Route path='/' component={MainContainer} indexRoute={Welcome}>
                      <Route path='counter' component={Counter} />
                  </Route>;



const appHistory = hashHistory
//const appHistory = useRouterHistory(createHistory)({ basename: __BASENAME__ })
//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

// render
ReactDOM.render(
  <Provider store={appStore} key="yyq-s" >
    <Router history={appHistory} routes={appRoutes} />
  </Provider>,
  document.getElementById('root')
)

