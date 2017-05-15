import React from 'react'
import {Link} from 'react-router'
import {Layout, Menu, Icon} from 'antd'
const {Header, Sider, Content} = Layout
const MenuItem = Menu.Item
const MenuSubMenu = Menu.SubMenu
import 'less/main.less'
import {inject, observer} from 'store/index'
import {whiteList} from 'pages/oauth'
const storeName = {
  menu: 'common/menu',
  member:'common/member'
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


  render() {
    const {location, children,appStore} = this.props
    const {data} = appStore.store[storeName.menu]
    const {member} = appStore.store[storeName.member]


    function handleClickMenu(){
      appStore.store[storeName.member].logout()
    }

    return(whiteList.indexOf(location.pathname) > -1)?
      (<div>{children}</div>):
      (
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
            {data.map((v) => (
              <MenuItem key={v.link}>
                <Link to={v.link}>
                  <Icon type={v.icon}/>
                  <span className="nav-text">{v.name}</span>
                </Link>
              </MenuItem>
            ))}
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
              <div className="button">
                {/*<Icon type="mail" />*/}
              </div>
              <Menu
                mode="horizontal"
                onClick={handleClickMenu}>
                <MenuSubMenu style={{
                  float: 'right',
                }} title={<span> <Icon type="user" />
                  {member.passport} </span>}
                >
                  <Menu.Item key="logout">
                    退出
                  </Menu.Item>
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
  }
}
