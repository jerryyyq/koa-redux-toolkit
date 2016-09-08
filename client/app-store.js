import { combineReducers, createStore } from 'redux'

var global_reducers = [];

export default 
{
    store: {},

    add_global_reducer: function (key_name, one_global_reducer)
    {
        console.log("in add_global_reducer, this = ", this)
        global_reducers[key_name] = one_global_reducer;
    },

    inject_reducer: function ({ key, reducer })
    {
        let total_reducers = Object.assign( [], global_reducers );
        total_reducers[key] = reducer;
        let new_reducer = combineReducers( total_reducers );
        this.store.replaceReducer( new_reducer );
    },

    create_store: function (root_reducer, init_state)
    {
        this.store = createStore(root_reducer, init_state, window.devToolsExtension && window.devToolsExtension())
    }
}