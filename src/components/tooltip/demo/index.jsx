import React, { Component } from 'react'
import ToolTip from '../index'
import Button from '../../button'
import styles from './index.styl'

class ToolTipDemo extends Component {
  handleChange = visible => {

  }

  state = {
    visible: true
  }

  handleChange = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    return (
      <ToolTip visible={this.state.visible} onVisibleChange={this.handleChange} title='haha' placement='top' className={styles.tip}>
        <Button onClick={this.handleChange}>hover me to show more message</Button>
      </ToolTip>
    )
  }
}

export default ToolTipDemo
