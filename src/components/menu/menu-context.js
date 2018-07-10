import React from 'react'

const menuContext = React.createContext({
  selectedKeys: [],
  itemClick: null,
  onOpenChange: null,
  mode: 'vertical'
})

const Provider = menuContext.Provider
const Consumer = menuContext.Consumer

const withMenu = Component => props => (
  <Consumer>
    {
      ({selectedKeys, itemClick, mode, onOpenChange}) => <Component {...props} itemClick={itemClick} selectedKeys={selectedKeys} mode={mode} onOpenChange={onOpenChange} />
    }
  </Consumer>
)

export { Provider, withMenu }
