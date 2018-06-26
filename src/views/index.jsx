import Button from '../components/button/demo'
import Icon from '../components/icon/demo'
import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, NavLink } from 'react-router-dom'
import styles from './index.styl'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className={styles.container}>
          <ul className={styles.sideNav}>
            <li>
              <NavLink activeClassName={styles.active} to='/button'>
                button
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={styles.active} to='/icon'>
                icon
              </NavLink>
            </li>
          </ul>
          <div className={styles.content}>
            <Route exact path='/' render={() => <Redirect to='/button' />} />
            <Route path='/button' component={Button} />
            <Route path='/icon' component={Icon} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default hot(module)(App)
