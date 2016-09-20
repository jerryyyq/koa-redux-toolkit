import { connect } from 'react-redux'
import global_store from '../app-store'
import LoginForm from './login-component'

// ------------------------------------
// Constants
// ------------------------------------
const SET_USER_NAME = 'SET_USER_NAME'
const SET_PASSWORD = 'SET_PASSWORD'
const SET_REMEMBER = 'SET_REMEMBER'
const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'

// ------------------------------------
// Actions
// ------------------------------------
function setComponentProperty(action_type, action_value)
{
    return {type: action_type, value: action_value}
}

function setLoginSubmit(result, err) {
    return {
        type: LOGIN_FORM_SUBMIT,
        result: result,
        error: err
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {username:'YYQ', password:'', remember:false}
function loginFormReducer (state = initialState, action) 
{
    let newState = Object.assign({}, state)
    switch (action.type) 
    {
        case SET_USER_NAME:
            newState.username = action.value
            return newState
        case SET_PASSWORD:
            newState.password = action.value
            return newState
        case SET_REMEMBER:
            newState.remember = action.value
            return newState
        case LOGIN_FORM_SUBMIT:
            // fetch: action.username, action.password, action.remember


        default:
            return state
    }
}

const mapStateToProps = (state) => ({
    userName: state.login.username,
    password: state.login.password,
    remember: state.login.remember
})

const mapDispatchToProps = {
    handleNameChange: e => setComponentProperty(SET_USER_NAME, e.target.value),
    handlePasswordChange: e => setComponentProperty(SET_PASSWORD, e.target.value),
    handleAgreeChange: e => setComponentProperty(SET_REMEMBER, e.target.checked),        
    handleSubmit: e => 
    {
        e.preventDefault();
        console.log("receive server data, e.target = ", e.target, " this = ", this, 
            " name = ", e.target.name, " userName = ", e.target.userName, " props = ", e.target.props);
/*
        if(!e.target.agree.checked)
        {
            alert("请同意协议");
            return setLoginSubmit(true, "请同意协议");
        }
*/
        let logindata = JSON.stringify( {username:e.target.name.value, password:e.target.pwd.value, remember:e.target.remember.checked} )
        fetch( 'http://192.168.2.253:3001/server/checkuserlogin', {mode: 'cors', method: "POST", body: logindata} ).then( 
            function(res){
                return res.json();
            })
        .then(function(json){
            console.log("receive server data, json = ", json);
            //global_store.store.dispatch( refresh_action(json) )


            
        })
        .catch(function(error){
            console.log('Request failed, error = ', error);
            return setLoginSubmit(false, error);
        });
    }
}


/////////////////////////////////////// 创建出绑定后的对象 //////////////////////////

export default function CreateLoginForm(store) 
{
    global_store.inject_reducer( {key: 'login', reducer: loginFormReducer} );
    console.log( " global_store.state = ", global_store.store.getState() );

    //通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
    return connect(mapStateToProps, mapDispatchToProps)(LoginForm);
};

