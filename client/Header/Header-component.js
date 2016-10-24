import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Toolbar, ToolbarSeparator} from 'material-ui/Toolbar'
import classes from '../app-style.scss'

import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
    toolBar: {backgroundColor: 'rgb(255,255,255)'},
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
}
const Header = ( {history, children}, context ) =>
{
    console.log( 'Header render children = ' + children )
    console.log( 'Header history = ' + history )
    console.log( 'Header context = ' + context )

    const handleClick = () =>
    {
        alert('click button! ' + test.value);
        //以下3种写法都可以，但是 history 已不推荐再使用，所以不要再用了
        //window.location.href = '/userinfo/' + test.value;
        //history.replace('/userinfo/' + test.value);
        context.router.replace('/userinfo/' + test.value);
    }

    return (
        <div>
            <h1>yangyuqi's mysql-koa-react-redux toolkit</h1>
            <Toolbar style={styles.toolBar}>
                <FlatButton label='Home' href='/' primary={true} />
                <ToolbarSeparator />
                <FlatButton label='Counter' href='/counter' primary={true} />
                <ToolbarSeparator />
                <FlatButton label='UserInfo' href='/userinfo' primary={true} />
                <ToolbarSeparator />
                <FlatButton label='Login' href='/login' primary={true} />
                <ToolbarSeparator />
                <input type='text' id='test' width='100' />
                <FlatButton label='Click me' onClick={handleClick} primary={true} />                
            </Toolbar>
            
            <Tabs>
                <Tab label="Item 1" ><div>
                    <h2 style={styles.headline}>Tab 1</h2>
                </div></Tab>
                <Tab label="Item 2" ><div>
                    <h2 style={styles.headline}>Tab 2</h2>
                </div></Tab>
                <Tab label="Item 3" ><div>
                    <h2 style={styles.headline}>Tab 3</h2>
                </div></Tab>
            </Tabs>

            <div className={classes.mainContainer}>
                { children }
            </div>
        </div>        
    )
}

Header.propTypes = {
    children: React.PropTypes.element,
    history: React.PropTypes.object
}

Header.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default Header