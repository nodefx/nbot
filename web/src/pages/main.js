import React from 'react'
import {Link} from 'react-router'
import {Layout, Menu, Icon} from 'antd'
const {Header, Sider, Content} = Layout
const MenuItem = Menu.Item
const MenuSubMenu = Menu.SubMenu
import 'less/main.less'
import {inject, observer} from 'store/index'
const storeName = {
  menu: 'common/menu'
}
@inject('appStore')
@observer
export default class extends React.Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleClickMenu(){

  }

  render() {
    const {location, children,appStore} = this.props
    const {data} = appStore.store[storeName.menu]
    const NaviMenu = data.map((v) => (
      <MenuItem key={v.link}>
        <Link to={v.link}>
          <Icon type={v.icon}/>
          <span className="nav-text">{v.name}</span>
        </Link>
      </MenuItem>
    ))

    if (['/oauth/login'].indexOf(location.pathname) > -1) {
      return <div>{children}</div>
    }

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{minHeight: '100%'}}
        >
          <div className="logo">
            {!this.state.collapsed && `Nbot`}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
            {NaviMenu}
          </Menu>
        </Sider>
        <Layout>
          <Header className="header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="rightbox">
              <Menu mode="horizontal" onClick={this.handleClickMenu}>
                <MenuSubMenu style={{
                  float: 'right',
                }} title={< span > <Icon type="user" /></span>}
                >
                  <MenuItem key="logout">
                    退出
                  </MenuItem>
                </MenuSubMenu>
              </Menu>
            </div>
          </Header>
          <Content style={{margin: '24px 16px', padding: 24, background: '#fff'}}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }  d
}
