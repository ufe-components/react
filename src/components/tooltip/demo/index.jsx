import React, { Component } from 'react'
import ToolTip from '../index'
import Button from '../../button'
import styles from './index.styl'

class ToolTipDemo extends Component {
  handleChange = visible => {

  }

  state = {
    visible: false
  }

  handleChange = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    return (
      <div>
        <section className={styles.tip}>
          <ToolTip trigger='hover' title='haha' placement='top'>
            <Button onClick={this.handleChange}>hover me to show more message</Button>
          </ToolTip>
        </section>
        <section className={styles.tip}>
          <ToolTip trigger='click' title='lol' placement='bottom'>
            <Button onClick={this.handleChange}>click me to show more message</Button>
          </ToolTip>
        </section>
      </div>
    )
  }
}

export default ToolTipDemo
