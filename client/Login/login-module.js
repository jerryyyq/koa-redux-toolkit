import { connect } from 'react-redux'
import global_store from '../app-store'
import LoginForm from './login-component'

// ------------------------------------
// Constants
// ------------------------------------
const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'

// ------------------------------------
// Actions
// ------------------------------------
function onLoginSubmit(username, password, agreement) {
    return {
        type: LOGIN_FORM_SUBMIT,
        username: username,
        password: password,
        agreement: agreeemnt
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const HEADER_ACTION_HANDLERS = {
    [LOGIN_FORM_SUBMIT]: (state, action) => ({username:action.username, password:acton.password, agreeemnt:action.agreeemnt})
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {username:'yyq', password:'', agreeemnt:''}
function loginFormReducer (state = initialState, action) {
    const handler = HEADER_ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}

const mapStateToProps = (state) => ({
    userName: state.username,
    password: state.password,
    agreement: state.agreement
})

const mapDispatchToProps = {
    handleSubmit:() => onLoginSubmit()
}


/////////////////////////////////////// 创建出绑定后的对象 //////////////////////////

export default function CreateLoginForm(store) 
{
    global_store.inject_reducer( {key: 'login', reducer: loginFormReducer} );
    let states2 = store.getState();
    console.log( "in CreateCounter, states2 = ", states2, " global_store.state = ", global_store.store.getState() );

    //通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
    return connect(mapStateToProps, mapDispatchToProps)(LoginForm);
};

