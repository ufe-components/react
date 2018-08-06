import React, { Component } from 'react'
import CheckBox from '../index'
import styles from './index.styl'

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false }
]

class Demo extends Component {
  state = {
    indeterminate: true,
    checkAll: false,
    list: ['Apple']
  }

  handleChange = (list) => {
    this.setState({
      list,
      indeterminate: !!list.length && (list.length < options.length),
      checkAll: list.length === options.length
    })
  }

  handleCheckAll = e => {
    this.setState({
      list: e.target.checked ? ['Apple', 'Pear', 'Orange'] : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }

  render () {
    return (
      <div>
        <CheckBox className={styles['item']}>simple one</CheckBox>
        <CheckBox checked disabled className={styles['item']}>disabled one</CheckBox>
        <div className={styles['item']}>
          <CheckBox.Group options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} />
        </div>
        <div className={styles['item']}>
          <CheckBox.Group options={options} defaultValue={['Pear']} />
        </div>
        <div className={styles['item']}>
          <CheckBox.Group options={optionsWithDisabled} disabled defaultValue={['Apple']} />
        </div>
        <div className={styles['item']}>
          <div style={{borderBottom: '1px solid #d9d9d9'}}>
            <CheckBox onChange={this.handleCheckAll} indeterminate={this.state.indeterminate} checked={this.state.checkAll} className={styles['item']}>
              check all
            </CheckBox>
          </div>
          <br />
          <CheckBox.Group onChange={this.handleChange} options={options} value={this.state.list} />
        </div>
      </div>
    )
  }
}

export default Demo
