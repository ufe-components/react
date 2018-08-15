import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.styl'
import PropTypes from 'prop-types'
import Icon from '../icon'

class TagItem extends React.Component {
  static propTypes = {
    item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    removeItem: PropTypes.func
  }

  handleRemove = e => {
    this.props.removeItem(e, this.props.item)
  }

  componentDidMount () {
    const dom = ReactDOM.findDOMNode(this)
    dom.childNodes[1].addEventListener('click', this.handleRemove)
  }

  componentWillUnmount () {
    const dom = ReactDOM.findDOMNode(this)
    dom.childNodes[1].removeEventListener('click', this.handleRemove)
  }

  render () {
    const { item } = this.props

    return (
      <li className={styles['ufe-select-tags-item']}>
        <div className={styles['ufe-select-tags-item-content']}>{item}</div>
        <Icon className={styles['ufe-select-tags-item-icon']} type='times' />
      </li>
    )
  }
}

export default TagItem
