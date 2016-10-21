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
const Header = ( {children} ) =>
{
    console.log( 'Header render children = ' + children )

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
    children: React.PropTypes.element.isRequired
}

export default Header