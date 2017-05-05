import React from 'react'
import {Link} from 'react-router'
import {Layout, Menu, Icon} from 'antd'
const {Header, Sider, Content} = Layout
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

  render() {
    const {location, children,appStore} = this.props
    const menuConf = appStore.store[storeName.menu].data
    const MenuItem = menuConf.map((v) => (
      <Menu.Item key={v.link}>
        <Link to={v.link}>
          <Icon type={v.icon}/>
          <span className="nav-text">{v.name}</span>
        </Link>
      </Menu.Item>
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
            {MenuItem}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{margin: '24px 16px', padding: 24, background: '#fff'}}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }  d
}
