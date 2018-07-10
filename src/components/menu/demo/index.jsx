import React, { Component } from 'react'
import Menu from '../index'
import Icon from '../../icon'
import styles from './index.styl'
const Item = Menu.Item
const SubMenu = Menu.SubMenu
const ItemGroup = Menu.ItemGroup

class MenuDemo extends Component {
  state = {
    selectedKeys: ['email'],
    selectedKeys2: ['sub1', '1'],
    selectedKeys3: ['sub2', '6']
  }

  handleClick = keys => {
    this.setState({
      selectedKeys: keys
    })
  }

  handleClick2 = keys => {
    this.setState({
      selectedKeys2: keys
    })
  }

  handleClick3 = keys => {
    this.setState({
      selectedKeys3: keys
    })
  }

  render () {
    return (
      <div>
        <section className={styles.demo}>
          <Menu itemClick={this.handleClick} mode='horizontal' selectedKeys={this.state.selectedKeys}>
            <Item id='email'>
              <Icon type='envelope-o' />
              Navigation One
            </Item>
            <Item id='app' disabled>
              <Icon type='bars' />
              Navigation Two
            </Item>
            <SubMenu id='car' title={<span><Icon type='car' />Navigation Three</span>}>
              <ItemGroup title='item 1'>
                <Item id='benz'>option 1</Item>
                <Item id='bmw'>option 2</Item>
              </ItemGroup>
              <ItemGroup title='item 2'>
                <Item id='audi'>option 3</Item>
                <Item id='toyota'>option 4</Item>
              </ItemGroup>
              <SubMenu id='sub3' title='Submenu'>
                <Item id='7'>option 7</Item>
                <Item id='8'>option 8</Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </section>
        <section className={styles.demo}>
          <Menu itemClick={this.handleClick2} selectedKeys={this.state.selectedKeys2} mode='inline' style={{width: 200}}>
            <SubMenu id='sub1' title={<span><Icon type='apple' />Navigation One</span>}>
              <ItemGroup title='item 1'>
                <Item id='1'>option 1</Item>
                <Item id='2'>option 2</Item>
              </ItemGroup>
              <ItemGroup title='item 2'>
                <Item id='3'>option 3</Item>
                <Item id='4'>option 4</Item>
              </ItemGroup>
            </SubMenu>
            <SubMenu id='sub2' title={<span><Icon type='amazon' />Navigation Two</span>}>
              <Item id='5'>option 5</Item>
              <Item id='6'>option 6</Item>
              <SubMenu id='sub3' title='Submenu'>
                <Item id='7'>option 7</Item>
                <Item id='8'>option 8</Item>
              </SubMenu>
            </SubMenu>
            <SubMenu id='sub4' title={<span><Icon type='google' />Navigation Three</span>}>
              <Item id='9'>option 9</Item>
              <Item id='10'>option 10</Item>
            </SubMenu>
          </Menu>
        </section>
        <section className={styles.demo}>
          <Menu itemClick={this.handleClick3} selectedKeys={this.state.selectedKeys3} mode='vertical' style={{width: 200}}>
            <SubMenu id='sub1' title={<span><Icon type='apple' />Navigation One</span>}>
              <ItemGroup title='item 1'>
                <Item id='1'>option 1</Item>
                <Item id='2'>option 2</Item>
              </ItemGroup>
              <ItemGroup title='item 2'>
                <Item id='3'>option 3</Item>
                <Item id='4'>option 4</Item>
              </ItemGroup>
            </SubMenu>
            <SubMenu id='sub4' title={<span><Icon type='google' />Navigation Three</span>}>
              <Item id='9'>option 9</Item>
              <Item id='10'>option 10</Item>
            </SubMenu>
            <SubMenu id='sub2' title={<span><Icon type='amazon' />Navigation Two</span>}>
              <Item id='5'>option 5</Item>
              <Item id='6'>option 6</Item>
              <SubMenu id='sub3' title='Submenu'>
                <Item id='7'>option 7</Item>
                <Item id='8'>option 8</Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </section>
      </div>
    )
  }
}

export default MenuDemo
