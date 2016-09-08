import { injectReducer } from '../app-reducers'
import LoginForm from './login-component'
import LoginFormReducer from './login-module'

export default (store) => ({
    path: 'loginform',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
        /*  Webpack - use require callback to define
            dependencies for bundling   */
            //const LoginForm = require('./login-component').default
            //const LoginFormReducer = require('./login-module').default

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: 'loginform', LoginFormReducer })

            /*  Return getComponent   */
            cb(null, LoginForm)

        /* Webpack named bundle   */
        }, 'loginform')
    }
})