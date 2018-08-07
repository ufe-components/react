import React, { Component } from 'react'
import Icon from '../icon'
import PropType from 'prop-types'
import styles from './index.styl'
import classnames from 'classnames'

class Star extends Component {
  static propTypes = {
    value: PropType.oneOf([0, 0.5, 1]),
    character: PropType.string,
    onHover: PropType.func,
    onChange: PropType.func,
    index: PropType.number,
    disabled: PropType.bool,
    allowHalf: PropType.bool
  }

  static defaultProps = {
    character: 'star',
    value: 0
  }

  handleClick = (e, index) => {
    e.stopPropagation()
    this.props.onChange(index)
  }

  render () {
    const { className, style, value, character, children, onHover, onChange, index, disabled, allowHalf, ...rest } = this.props
    const classes = classnames({
      [styles['ufe-star']]: true,
      [styles['ufe-star-disabled']]: disabled,
      [styles['ufe-star-half']]: value === 0.5,
      [styles['ufe-star-full']]: value === 1
    }, className)

    return (
      <li className={classes} style={style} {...rest}>
        {
          allowHalf ? <div className={styles['ufe-star-first']} onClick={e => this.handleClick(e, index - 0.5)} onMouseMove={() => onHover(index - 0.5)}>
            <Icon type={character} />
          </div> : null
        }
        <div className={styles['ufe-star-second']} onClick={e => this.handleClick(e, index)} onMouseMove={() => onHover(index)}>
          <Icon type={character} />
        </div>
      </li>
    )
  }
}

export default Star
