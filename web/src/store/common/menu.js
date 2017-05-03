/**
 * Created by ken on 2017/4/11.
 */
import {observable, action, autorun, computed} from 'mobx'
export default class {
  @observable data = [
    {name: '控制面板', link: '/', 'icon': 'desktop'},
    {name: '项目管理', link: '/devops/project', 'icon': 'appstore'},
    {name: '用户管理', link: '/devops/user', 'icon': 'user'},
    {name: 'ssh管理', link: '/devops/ssh', 'icon': 'code'}
  ]
}
