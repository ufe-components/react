import React, { Component } from 'react'
import Radio from '../index'

const options = ['Apple', 'Pear', 'Orange']

class Demo extends Component {
  state = {
    value: 'Apple'
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  render () {
    return (
      <div>
        <div style={{margin: 20}}>
          <Radio>simple</Radio>
          <Radio checked disabled>disable</Radio>
        </div>
        <div style={{margin: 20}}>
          <Radio.Group options={options} value={this.state.value} onChange={this.handleChange} />
        </div>
        <div style={{margin: 20}}>
          <Radio.Group disabled options={options} value={this.state.value} onChange={this.handleChange} />
        </div>
        <div style={{margin: 20}}>
          <Radio.Group name='fruit' defaultValue={1}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </div>
        <div style={{margin: 20}}>
          <Radio.Group size='small' type='button' options={options} value={this.state.value} onChange={this.handleChange} />
        </div>
        <div style={{margin: 20}}>
          <Radio.Group disabled type='button' options={options} value={this.state.value} onChange={this.handleChange} />
        </div>
        <div style={{margin: 20}}>
          <Radio.Group size='large' type='button' options={options} value={this.state.value} onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}

export default Demo
