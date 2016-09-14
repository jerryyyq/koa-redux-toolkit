import { connect } from 'react-redux'
import global_store from '../app-store'
import LoginForm from './login-component'

// ------------------------------------
// Constants
// ------------------------------------
const SET_USER_NAME = 'SET_USER_NAME'
const SET_PASSWORD = 'SET_PASSWORD'
const SET_AGREEMENT = 'SET_AGREEMENT'
const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'

// ------------------------------------
// Actions
// ------------------------------------
function setComponentProperty(action_type, action_value)
{
    return {type: action_type, value: action_value}
}

function onLoginSubmit(username, password, agreement) {
    return {
        type: LOGIN_FORM_SUBMIT,
        username: username,
        password: password,
        agreement: agreeemnt
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {username:'yyq', password:'', agreeemnt:false}
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
        case SET_AGREEMENT:
            newState.agreeemnt = action.value
            return newState
        case LOGIN_FORM_SUBMIT:
            // fetch: action.username, action.password, action.agreement


        default:
            return state
    }
}

const mapStateToProps = (state) => ({
    userName: state.login.username,
    password: state.login.password,
    agreement: state.login.agreement
})

const mapDispatchToProps = {
    handleNameChange: e => setComponentProperty(SET_USER_NAME, e.target.value),
    handlePasswordChange: e => setComponentProperty(SET_PASSWORD, e.target.value),
    handleAgreeChange: e => setComponentProperty(SET_AGREEMENT, e.target.checked),        
    handleSubmit: e => 
    {
        console.log("receive server data, e.target = ", e.target);
    //    let datas = e.target.map( x=>({name:x.name, value:x.value}) )
    //    let datas2=[];
    //    for (var key in e.target) 
    //    {
    //        datas2.push( {name:key.name, value:key.value} );
    //    }


        let data = JSON.stringify({a: 1, b: 2})
        fetch( 'http://192.168.2.253:3001/server/checkuserlogin/', {mode: 'cors', method: "POST", body: data} ).then( 
            function(res){
                return res.json();
            })
        .then(function(json){
            console.log("receive server data, json = ", json);
            //global_store.store.dispatch( refresh_action(json) )
        })
        .catch(function(error){
            console.log('Request failed, error = ', error);
        });
        
        //if (agreement != )
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

