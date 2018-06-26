import React, { Component } from 'react'
import Icon from '../index'
import styles from './index.styl'

class IconDemo extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Icon type='bath' />
        <Icon spin />
        <Icon type='file' style={{fontSize: 24}} />
      </div>
    )
  }
}

export default IconDemo
