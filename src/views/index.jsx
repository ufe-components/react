import Button from '../components/button/demo'
import Icon from '../components/icon/demo'
import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, NavLink } from 'react-router-dom'
import styles from './index.styl'
import ToolTip from '../components/tooltip/demo'
import MenuDemo from '../components/menu/demo'
import Menu from '../components/menu'
import Input from '../components/input/demo'
import CheckBox from '../components/checkbox/demo'
const Item = Menu.Item

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className={styles.container}>
          <Menu mode='inline' className={styles.sideNav}>
            <Item id='button'>
              <NavLink activeClassName={styles.active} to='/button'>
                button
              </NavLink>
            </Item>
            <Item id='icon'>
              <NavLink activeClassName={styles.active} to='/icon'>
                icon
              </NavLink>
            </Item>
            <Item id='tooltip'>
              <NavLink activeClassName={styles.active} to='/tooltip'>
                tooltip
              </NavLink>
            </Item>
            <Item id='menu'>
              <NavLink activeClassName={styles.active} to='/menu'>
                menu
              </NavLink>
            </Item>
            <Item id='input'>
              <NavLink activeClassName={styles.active} to='/input'>
                input
              </NavLink>
            </Item>
            <Item id='checkbox'>
              <NavLink activeClassName={styles.active} to='/checkbox'>
                checkbox
              </NavLink>
            </Item>
          </Menu>
          <div className={styles.content}>
            <Route exact path='/' render={() => <Redirect to='/button' />} />
            <Route path='/button' component={Button} />
            <Route path='/icon' component={Icon} />
            <Route path='/tooltip' component={ToolTip} />
            <Route path='/menu' component={MenuDemo} />
            <Route path='/input' component={Input} />
            <Route path='/checkbox' component={CheckBox} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default hot(module)(App)
