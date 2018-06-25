import React, { Component } from 'react'
import Button from '../index'
import ButtonGroup from '../button-group'
import styles from './index.styl'

class ButtonDemo extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Button>default</Button>
        <Button type='primary' size='large'>primary large</Button>
        <Button type='danger' size='small'>danger small</Button>
        <Button icon='user-o'>icon user</Button>
        <Button type='dashed'>dashed</Button>
        <Button shape='circle' icon='search'>circle</Button>
        <Button disabled>disabled</Button>
        <div className={styles.ghost}>
          <Button ghost>ghost</Button>
          <Button ghost type='primary'>ghost primary</Button>
          <Button ghost type='danger'>ghost danger</Button>
          <Button ghost type='dashed'>ghost dashed</Button>
        </div>
        <ButtonGroup className={styles.group}>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </ButtonGroup>
        <ButtonGroup className={styles.group} size='large'>
          <Button type='primary'>L</Button>
          <Button type='primary'>M</Button>
          <Button type='primary'>S</Button>
        </ButtonGroup>
        <ButtonGroup className={styles.group}>
          <Button type='danger'>L</Button>
          <Button type='danger'>M</Button>
          <Button type='danger'>S</Button>
        </ButtonGroup>
        <ButtonGroup className={styles.group} size='small'>
          <Button disabled>L</Button>
          <Button disabled>M</Button>
          <Button disabled>S</Button>
        </ButtonGroup>
      </div>
    )
  }
}

export default ButtonDemo
