import React, { Component } from 'react'
import Star from './star'
import PropTypes from 'prop-types'
import styles from './index.styl'
import classnames from 'classnames'

function noop () {}

class Rate extends Component {
  static propTypes = {
    count: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
    onHover: PropTypes.func,
    disabled: PropTypes.bool,
    allowClear: PropTypes.bool,
    allowHalf: PropTypes.bool
  }

  static defaultProps = {
    count: 5,
    value: 0,
    disabled: false,
    allowClear: true,
    allowHalf: true
  }

  lastValue = this.props.value
  beforeValue = null

  state = {
    value: this.props.value
  }

  handleHover = index => {
    if ((this.state.value !== index) && (index !== this.beforeValue)) {
      this.beforeValue = null
      this.setState({
        value: index
      }, () => {
        if (this.props.onHover) {
          this.props.onHover(index)
        }
      })
    }
  }

  handleClick = index => {
    if (this.lastValue !== index) {
      this.setState({
        value: index
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(index)
        }
      })
      this.lastValue = index
    } else if (this.props.allowClear) {
      this.beforeValue = this.state.value
      this.setState({
        value: 0
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(0)
        }
      })
      this.lastValue = 0
    }
  }

  handleLeave = e => {
    if (this.lastValue !== this.state.value) {
      this.setState({
        value: this.lastValue
      })
    }
    this.beforeValue = null
  }

  render () {
    const { count, value, children, className, style, onChange, onHover, disabled, allowClear, allowHalf, ...rest } = this.props
    const classes = classnames({
      [styles['ufe-rate']]: true
    }, className)
    const stateValue = this.state.value
    const stars = []
    for (let i = 0; i < count; i++) {
      let starValue = stateValue - i > 1 ? 1 : stateValue - i
      starValue = starValue > 0.5 ? 1 : starValue < 0.5 ? 0 : allowHalf ? 0.5 : 1
      stars.push(<Star allowHalf={allowHalf} index={i + 1} onChange={!disabled ? this.handleClick : noop} onHover={!disabled ? this.handleHover : noop} disabled={disabled} value={starValue} key={i} />)
    }
    return (
      <ul className={classes} style={style} {...rest} onMouseLeave={this.handleLeave}>
        {stars}
      </ul>
    )
  }
}

export default Rate
