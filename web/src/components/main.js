import React from 'react'
import {Link} from 'react-router'
import {Layout, Menu, Icon} from 'antd'
const {Header, Sider, Content} = Layout
import './main.less'
const menuConf = [
  {name: '控制面板', link: '/', 'icon': 'desktop'},
  {name: '项目管理', link: '/devops/project', 'icon': 'appstore'},
  {name: '用户管理', link: '/devops/user', 'icon': 'user'},
  {name: 'ssh管理', link: '/devops/ssh', 'icon': 'code'}
]
export default class extends React.Component {

  state = {
    collapsed: false
  }

  constructor(props) {
    super(props)
    console.log(props.location.pathname)
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const MenuItem = menuConf.map((v) => (
      <Menu.Item key={v.link}>
        <Link to={v.link}>
          <Icon type={v.icon}/>
          <span className="nav-text">{v.name}</span>
        </Link>
      </Menu.Item>
    ))
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            Node Devops
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.location.pathname]}>
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
          <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
