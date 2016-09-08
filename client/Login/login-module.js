
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'

// ------------------------------------
// Actions
// ------------------------------------
export function onLoginSubmit(username, password, agreement) {
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
export default function loginFormReducer (state = initialState, action) {
    const handler = HEADER_ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}

