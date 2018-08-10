import React, { Component } from 'react'
import styles from './index.styl'
import classnames from 'classnames'
import PropTypes from 'prop-types'

class OptionGroup extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  handleClick = e => {
    e.stopPropagation()
  }

  render () {
    const {children, label, className, onChange, selectedValue, ...rest} = this.props
    const groupClass = classnames({
      [styles['ufe-select-group']]: true
    }, className)
    const groupTitleClass = classnames({
      [styles['ufe-select-group-title']]: true
    })
    const groupListClass = classnames({
      [styles['ufe-select-group-list']]: true
    })
    return (
      <li onClick={this.handleClick} {...rest} className={groupClass}>
        <div className={groupTitleClass}>{label}</div>
        <ul className={groupListClass}>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              onChange,
              selectedValue
            })
          })}
        </ul>
      </li>
    )
  }
}

export default OptionGroup
