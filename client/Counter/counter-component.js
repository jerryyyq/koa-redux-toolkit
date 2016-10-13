import React, { Component, PropTypes } from 'react'

class Counter extends Component {
    render () {
    // 从组件的props属性中导入四个方法和2个变量
        const { increment, incrementIfOdd, incrementAsync, decrement, counter1, counter2 } = this.props
    // 渲染组件，包括2个数字，四个按钮
        return (
            <p>
                Clicked: {counter1}, {counter2} times
                {' '}
                <button onClick={increment}>+</button>
                {' '}
                <button onClick={decrement}>-</button>
                {' '}
                <button onClick={incrementIfOdd}>Increment if odd</button>
                {' '}
                <button onClick={() => incrementAsync()}>Increment async</button>
            </p>
    )
    }
};

// 限制组件的props安全
Counter.propTypes = {
  // increment必须为fucntion,且必须存在
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,

  // counter必须为数字，且必须存在
    counter1: PropTypes.number.isRequired,
    counter2: PropTypes.number.isRequired
}

export default Counter
