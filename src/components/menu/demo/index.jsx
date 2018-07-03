import React, { Component } from 'react'
import Menu from '../index'
const Item = Menu.Item
const SubMenu = Menu.SubMenu
const ItemGroup = Menu.ItemGroup

class MenuDemo extends Component {
  render () {
    return (
      <Menu mode='horizontal'>
        <Item>
          navigation one
        </Item>
        <Item>
          navigation two
        </Item>
        <SubMenu title='navigation three'>
          <ItemGroup title='item 1'>
            <Item>option 1</Item>
            <Item>option 2</Item>
          </ItemGroup>
          <ItemGroup title='item 2'>
            <Item>option 3</Item>
            <Item>option 4</Item>
          </ItemGroup>
        </SubMenu>
      </Menu>
    )
  }
}

export default MenuDemo
