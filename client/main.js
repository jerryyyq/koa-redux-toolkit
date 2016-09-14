
import { Router, Route, Link, hashHistory, useRouterHistory } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//import { createHashHistory } from 'history'
//import { syncHistoryWithStore } from 'react-router-redux'

import classes from './app-style.scss'

import global_store from './app-store'
//import CreateCounter, {injectCounterReducer} from './Counter/counter-module'
//import CreateUserTable, {injectUserInfoReducer} from './UserInfo/userinfo-module'
//import CreateLogin from './Login/login-module'



// ========================================================
// Developer Tools Setup
// ========================================================
//console.log( "__DEBUG__ = " + process.env.__DEBUG__ )
//if (__DEBUG__) {
  if (window.devToolsExtension) 
  {
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
    <p><Link to="/userinfo">UserInfo</Link></p>
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
const CreateChildRoute = (child_path, child_module_path, store) => ({
    path: child_path,
    getComponent: (nextState, cb) => 
    {
        require.ensure([], (require) => 
        {
            let ItemCreate = require( child_module_path ).default;
            console.log('ItemCreate = ', ItemCreate);
            cb(null, ItemCreate(store))
        // Webpack named bundle    
        }, child_path)
    }  
});

console.log("CreateChildRoute = ", CreateChildRoute);
*/


const appRoutes = (store) => ({
    path: '/',
    component: MainContainer,
    indexRoute: Welcome,

    childRoutes: 
    [
        { 
            path: 'counter',
            getComponent: (nextState, cb) => 
            {
                require.ensure([], (require) => 
                {
                    var ItemCreate = require('./Counter/counter-module').default;
                    console.log('ItemCreate = ', ItemCreate);
                    cb(null, ItemCreate(store))
                })
            }
        },

        //CreateChildRoute('userinfo', './UserInfo/userinfo-module', store),
        {
            path: 'userinfo',
            getComponent: (nextState, cb) =>
            {
                require.ensure([], (require) =>
                {
                    var ItemCreate = require('./UserInfo/userinfo-module').default;
                    console.log('ItemCreate = ', ItemCreate);
                    cb(null, ItemCreate(store))
                })
            }
        },

        {
            path: 'login',
            getComponent: (nextState, cb) =>
            {
                require.ensure([], (require) =>
                {
                    var ItemCreate = require('./Login/login-module').default;
                    console.log('ItemCreate = ', ItemCreate);
                    cb(null, ItemCreate(store))
                })
            }
        },
    ]
});


/*
const appRoutes2 = <Route path='/' component={MainContainer} indexRoute={Welcome}>
                      <Route path='counter' component={CreateCounter(appStore)} onEnter={injectCounterReducer(appStore)}/>
                      <Route path='userinfo' component={CreateUserTable(appStore)} onEnter={injectUserInfoReducer(appStore)} />
                  </Route>;



const appRoutes3 = <Route path='/' component={MainContainer} indexRoute={Welcome}>
                      <Route path='counter' component={require('react-router!./Counter/counter-module')} />
                      <Route path='userinfo' component={require('react-router!./UserInfo/userinfo-module')} />
                      <Route path='login' component={require('react-router!./Login/login-module')} />
                  </Route>;
*/

const appHistory = hashHistory
//const appHistory = useRouterHistory(createHistory)({ basename: __BASENAME__ })
//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

// render
        //<Router history={appHistory} routes={appRoutes(appStore)} />
ReactDOM.render(
    <Provider store={appStore} key="yyq-s" >
        <Router history={appHistory} routes={appRoutes(appStore)} />
    </Provider>,
    document.getElementById('root')
)

