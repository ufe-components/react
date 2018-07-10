import React, { Component } from 'react'
import Icon from '../index'
import styles from './index.styl'
import {CSSTransition} from 'react-transition-group'

class IconDemo extends Component {
  state = {
    visible: true
  }

  handleClick = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <Icon type='bath' />
        <Icon spin />
        <Icon type='file' style={{fontSize: 24}} />
        <div className={styles['up']} onClick={this.handleClick}>
          <CSSTransition in={this.state.visible}
            timeout={1000}
            classNames={{
              enter: styles['angle-enter'],
              enterActive: styles['angle-enter-active'],
              enterDone: styles['angle-enter-done'],
              exit: styles['angle-exit'],
              exitActive: styles['angle-exit-active'],
              exitDone: styles['angle-exit-done']
            }}
          >
            <Icon type='angle-up' />
          </CSSTransition>
        </div>
      </div>
    )
  }
}

export default IconDemo
