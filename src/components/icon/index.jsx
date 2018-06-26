import React from 'react'
import classNames from 'classnames'
import styles from './index.styl'
import PropTypes from 'prop-types'

const Icon = ({type, className, spin, ...rest}) => {
  type = spin ? 'spinner' : type
  const classes = classNames({
    [styles['ufe-icon']]: true,
    'fa-pulse': spin || type === 'spinner',
    [`fa fa-${type}`]: !!type
  }, className)

  return <i {...rest} className={classes} />
}

Icon.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  spin: PropTypes.bool
}

export default Icon
