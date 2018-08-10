import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, NavLink } from 'react-router-dom'
import styles from './index.styl'
import Menu from '../components/menu'
const Item = Menu.Item

const components = ['button', 'icon', 'tooltip', 'menu', 'input', 'checkbox', 'radio', 'rate', 'select']

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className={styles.container}>
          <Menu mode='inline' className={styles.sideNav}>
            {
              components.map(name => (
                <Item key={name} id={name}>
                  <NavLink activeClassName={styles.active} to={`/${name}`}>
                    {name}
                  </NavLink>
                </Item>
              ))
            }
          </Menu>
          <div className={styles.content}>
            <Route exact path='/' render={() => <Redirect to='/button' />} />
            {
              components.map(name => (
                <Route key={name} path={`/${name}`} component={require(`../components/${name}/demo`).default} />
              ))
            }
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default hot(module)(App)
