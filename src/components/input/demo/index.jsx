import React, { Component } from 'react'
import Input from '../index'
import styles from './index.styl'
import Icon from '../../icon'

class InputDemo extends Component {
  state = {
    name: ''
  }

  handleChangeName = e => {
    this.setState({
      name: e.target.value
    })
  }

  removeName = e => {
    this.setState({
      name: ''
    })
  }

  render () {
    return (
      <div className={styles.main}>
        <Input autoFocus defaultValue='aaa' className={styles.inputEx} placeholder='this is a simple text input' />
        <Input size='large' className={styles.inputEx} placeholder='this is a large text input' />
        <Input size='small' className={styles.inputEx} placeholder='this is a small text input' />
        <Input addonBefore='http://' addonAfter='.com' className={styles.inputEx} />
        <Input size='large' addonBefore='http://' addonAfter='.com' className={styles.inputEx} />
        <Input size='small' addonBefore='http://' addonAfter='.com' className={styles.inputEx} />
        <Input addonAfter={<Icon type='cog' />} className={styles.inputEx} />
        <Input value={this.state.name} onChange={this.handleChangeName} prefix={<Icon type='user-o' />} suffix={this.state.name ? <Icon type='times' onClick={this.removeName} /> : null} className={styles.inputEx} placeholder='enter your name' />
        <Input suffix={<Icon type='search' />} className={styles.inputEx} placeholder='input search text' />
        <Input addonAfter={<Icon type='search' />} className={styles.inputEx} placeholder='input search text' />
        <Input.textarea autosize={{minRows: 3, maxRows: 8}} className={styles.inputEx} />
      </div>
    )
  }
}

export default InputDemo
