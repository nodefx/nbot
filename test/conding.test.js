/**
 * Created by ken on 2017/4/27.
 */
const {exec,spawn} = require('child_process')
const path = require('path')
const rootpath = path.dirname(__dirname)
const {cmd} = require('../app/tool')

cmd(`node`, [`${rootpath}/deploy/push.js`,`'[{"x-real-ip":"120.132.59.96","x-forwarded-for":"120.132.59.96","host":"webhook.wvovo.com","x-nginx-proxy":"true","content-length":"1015","user-agent":"Coding.net Hook","x-coding-event":"push","content-type":"application/json; charset=UTF-8","accept-encoding":"gzip,deflate","path":"/root/nodewww/webhook","ref":"refs/heads/master","before":"d1ccca987f970b260fc4379d8693372b9b7ce574","commits":[{"committer":{"name":"ken","email":"kenxu@mazing.com"},"web_url":"https://coding.net/u/ckken/p/webhook/git/commit/2dab49818560708fd2b44e391193225d147e868d","short_message":"v0.0.3\n","sha":"2dab49818560708fd2b44e391193225d147e868d"}],"after":"2dab49818560708fd2b44e391193225d147e868d","event":"push","repository":{"owner":{"path":"/u/ckken","web_url":"https://coding.net/u/ckken","global_key":"ckken","name":"ckken","avatar":"https://dn-coding-net-avatar.qbox.me/fb5be01e-d741-454e-a945-f585a4109851.jpg"},"https_url":"https://git.coding.net/ckken/webhook.git","web_url":"https://coding.net/u/ckken/p/webhook","project_id":"1101880","ssh_url":"git@git.coding.net:ckken/webhook.git","name":"webhook","description":""},"user":{"path":"/u/ckken","web_url":"https://coding.net/u/ckken","global_key":"ckken","name":"ckken","avatar":"https://dn-coding-net-avatar.qbox.me/fb5be01e-d741-454e-a945-f585a4109851.jpg"},"token":"coding","_id":"BmWVDAIiTCy150Uz"}]'`])
