import classes from './app-style.scss'

//import CreateCounter, {injectCounterReducer} from './Counter/counter-module'
//import CreateUserTable, {injectUserInfoReducer} from './UserInfo/userinfo-module'
//import CreateLogin from './Login/login-module'

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

export default appRoutes