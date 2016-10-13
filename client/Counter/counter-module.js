import { connect } from 'react-redux'
import global_store from '../app-store'
import Counter from './counter-component'

const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

// ////////////////////////////////////// Action /////////////////////////////////////////
// 加一的方法
function increment_action ()
{
    return {
        type: INCREMENT_COUNTER
    }
}

// 减一的方法
function decrement_action () {
    return {
        type: DECREMENT_COUNTER
    }
}
// 奇数加一的方法，该方法返回一个方法，包含dispatch和getState两个参数，dispatch用于执行action的方法，getState返回state
function incrementIfOdd_action ()
{
    return (dispatch, getState) =>
    {
    // 获取state对象中的counter属性值
        console.log('in incrementIfOdd_action, states = ', getState())

        const { counter1 } = getState().counter

    // 偶数则返回
        if (0 === counter1 % 2)
            return

    // 没有返回就执行加一
        dispatch(increment_action())
    }
}

function incrementIfOdd_action2 (dispatch, state)
{
    // 获取state对象中的counter属性值
    console.log('in incrementIfOdd_action, states = ', state)

    const counter1 = state.counter.counter1

    // 偶数则返回
    if (0 === counter1 % 2)
        return

    // 没有返回就执行加一
    dispatch(increment_action())
}

// 延迟加一的方法,包含一个默认参数delay,返回一个方法,一秒后加一
function incrementAsync_action (delay = 1000) {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment_action())
        }, delay)
    }
}

// 这些方法都导出,在其他文件导入时候,使用import * as actions 就可以生成一个actions对象包含所有的export

// ////////////////////////////////////// Reducers /////////////////////////////////////////
// reducer其实也是个方法而已,参数是state和action,返回值是新的state
const initState2 = { counter1:0, counter2:2 }
function counter_reducer (state = initState2, action)
{
    switch (action.type) {
    case INCREMENT_COUNTER:
        return { counter1: state.counter1 + 1, counter2: state.counter2 }
    case DECREMENT_COUNTER:
        return { counter1: state.counter1 - 1, counter2: state.counter2 }
    default:
        return state
    }
}

// ////////////////////////////////////// 绑定 action 和 dispatch 到组件 ///////////////////////
const mapStateToProps = (state) => ({
    counter1: state.counter.counter1,
    counter2: state.counter.counter2
})

// 将action的所有方法绑定到props上
function mapDispatchToProps (dispatch)
{
    // return bindActionCreators(CounterActions, dispatch)
    return {
        increment: () => dispatch(increment_action()),
        decrement: () => dispatch(decrement_action()),
        incrementIfOdd: () => incrementIfOdd_action2(dispatch, global_store.store.getState()),
        incrementAsync: () => incrementAsync_action()
    }
}

// ///////////////////////////////////// 在 store 创建对应节点，并绑定对应的 Reducer //////////////////////////
export function injectCounterReducer (store)
{
    console.log('in CreateCounter, store = ', store)
    let states1 = store.getState()
    console.log('in CreateCounter, states1 = ', states1)

    global_store.inject_reducer({key: 'counter', reducer: counter_reducer})

    let states2 = store.getState()
    console.log('in CreateCounter, states2 = ', states2, ' global_store = ', global_store)
}

// ///////////////////////////////////// 创建出绑定后的对象 //////////////////////////

export default function CreateCounter (store)
{
    global_store.inject_reducer({key: 'counter', reducer: counter_reducer})
    // let states2 = store.getState();
    console.log(' global_store.state = ', global_store.store.getState())

    // 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
    return connect(mapStateToProps, mapDispatchToProps)(Counter)
};
