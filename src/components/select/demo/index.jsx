import React, { Component } from 'react'
import Select from '../index'

const Option = Select.Option
const OptionGroup = Select.OptionGroup

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option value={i.toString(36) + i} key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

class Demo extends Component {
  state = {
    value: 'jack'
  }

  handleChange = value => {
    this.setState({
      value
    })
  }

  render () {
    return (
      <div>
        <div style={{margin: 20, display: 'inline-block'}}>
          <Select defaultValue='jack' style={{width: 120}}>
            <Option value='jack'>
              <span>jack</span>
            </Option>
            <Option value='lucy'>lucy</Option>
            <Option value='disabled' disabled>disabled</Option>
          </Select>
        </div>
        <div style={{margin: 20, display: 'inline-block'}}>
          <Select disabled defaultValue='jack' style={{width: 120}}>
            <Option value='jack'>
              <span>jack</span>
            </Option>
            <Option value='lucy'>lucy</Option>
            <Option value='disabled' disabled>disabled</Option>
          </Select>
        </div>
        <div style={{margin: 20, display: 'inline-block'}}>
          <Select value={this.state.value} onChange={this.handleChange} style={{width: 120}}>
            <OptionGroup label='Boss'>
              <Option value='jack'>
                <span>jack</span>
              </Option>
              <Option value='lucy'>lucy</Option>
            </OptionGroup>
            <OptionGroup label='worker'>
              <Option value='sonacy'>sonacy</Option>
            </OptionGroup>
          </Select>
        </div>
        <div style={{margin: 20, display: 'inline-block'}}>
          <Select showSearch style={{width: 200}} placeholder='select a person'>
            <Option value='jack'>jack</Option>
            <Option value='lucy'>lucy</Option>
            <Option value='sonacy'>sonacy</Option>
          </Select>
        </div>
        <div style={{margin: 20, display: 'inline-block'}}>
          <Select mode='multiple' style={{width: 210}} placeholder='multiple mode'>
            {children}
          </Select>
        </div>
        <div style={{margin: 20, display: 'inline-block'}}>
          <Select mode='tags' style={{width: 210}} placeholder='tags mode'>
            {children}
          </Select>
        </div>
      </div>
    )
  }
}

export default Demo
