import { connect } from 'react-redux'
import global_store from '../app-store'
import fetch from 'node-fetch'
import {Table} from 'antd'


const REFRESH_DATA = 'REFRESH_DATA'

function refresh_action( data )
{
  return {
    type: REFRESH_DATA,
    payload: data
  }
}

//////////////////////////////////////// 绑定 action 和 dispatch 到组件 ///////////////////////
const mapStateToProps = (state) => ({
    dataSource: state.user_info.data,
    columns: state.user_info.columns
});

//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    //return bindActionCreators(CounterActions, dispatch)
    return{

    };
}

//////////////////////////////////////// Reducers /////////////////////////////////////////
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
const table_columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
    } 
];


const initState = { data:[{ID:1, name:'z', sex:0}], columns:table_columns }


function userinfo_reducer(state = initState, action) 
{
  switch (action.type) {
    case REFRESH_DATA:
      return { data: action.payload, columns: state.columns }

    default:
      return state
  }
}


/////////////////////////////////// 获得服务端数据 ///////////////////////////////
var get_user_info = (userid) =>
{
    fetch( 'http://localhost:3001/server/getuserinfo/' + userid, {mode: 'no-cors'} ).then( 
        function(res){
            return res.json();
        })
    .then(function(json){
        console.log("receive server data, json = ", json);
        global_store.store.dispatch( refresh_action(json) )
    })
    .catch(function(error){
        console.log('Request failed, error = ', error);
    });
}



/////////////////////////////////////// 在 store 创建对应节点，并绑定对应的 Reducer //////////////////////////
export function injectUserInfoReducer(store)
{
    let states1 = store.getState();
    console.log("in injectUserInfoReducer, states1 = ", states1);
    
    global_store.inject_reducer( {key: 'user_info', reducer: userinfo_reducer} );

    let states2 = store.getState();
    console.log("in injectUserInfoReducer, states2 = ", states2, " global_store = ", global_store);


    setTimeout(get_user_info("1"), 2000);
}

/////////////////////////////////////// 创建出绑定后的对象 //////////////////////////

export default function CreateUserTable(store) 
{
    //通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
    return connect(mapStateToProps, mapDispatchToProps)(Table);
};
