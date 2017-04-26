const http = require('http');
const createHandler = require('./gitlab-webhook-handler');
const handler = createHandler({path: '/'});
const fs = require('fs');
const os = require('os');
const nm = require('nodemailer');
let email = {
    user: 'ckken@qq.com',
    pwd: 'ck666666',
    host: 'smtp.exmail.qq.com',
    port: 465,
    from_user: 'noreply <noreply@vcotime.com>',
    to_user: 'ken <ckken@qq.com>;',
    html: '<b>' + new Date().toLocaleString() + '</b><br/>'
};
let httpPort = 1357
let run_cmd = function (cmd, args, callback) {
    let spawn = require('child_process').spawn;
    let child = spawn(cmd, args);
    let resp = "";
    child.stdout.on('data', function (buffer) {
        resp += buffer.toString();
    });
    child.stdout.on('end', function () {
        callback(resp)
    });
};
let send_email = function () {
    let transporter = nm.createTransport('smtps://' + email.user + ':' + email.pwd + '@' + email.host);
    let mailOptions = {
        from: email.from_user, // sender address
        to: email.to_user, // list of receivers
        subject: email.subject, // Subject line
        //text: 'Hello world 🐴', // plaintext body
        html: email.html // html body
    };
};
let gitlog = function (payload, cb) {
    // let txt = fs.readFileSync('git.log','utf-8')
    // if(txt) {
    email.subject = '[' + payload.repository.homepage.slice(24) + '] ' + payload.ref.slice(11) + '分支更新'
    email.html += '更新日志:<br/>' + payload.commits[0].author.name + '提交更新至分支:' + payload.ref.slice(11) + '<br/>' +
        '更新信息:' + payload.commits[0].message + '<br/>' +
        'commit详情:' + payload.commits[0].url;
    cb && cb();
    // }
};


handler.on('push', function (event) {
    console.log(new Date().toLocaleString());
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
    //console.log('payload:',event.payload)
    // 验证push分支是否正确
    // 开发环境
    if (event.payload.ref === 'refs/heads/development') {
        run_cmd('sh', [`${basePath}/autopublish/deploy-pull.sh`], d => {
            autoReloadNginx();
            let afterPullPackageJson = fs.readFileSync(`${basePath}/package.json`, 'utf-8');
            if (beforePullPackageJson !== afterPullPackageJson) {
                console.log('do ******* deploy-install-start');
                run_cmd('sh', [`${basePath}/autopublish/deploy-install-start.sh`], e => {
                    gitlog(event.payload, send_email);
                });
            } else {
                console.log('do ******* deploy-normal-start');
                run_cmd('sh', [`${basePath}/autopublish/deploy-normal-start.sh`], e => {
                    gitlog(event.payload, send_email);
                });
            }
            run_cmd('sh', [`${basePath}/autopublish/apidoc.sh`], e => {
                gitlog(event.payload, send_email);
            });
        });
    }
    // 生产环境
    if (event.payload.ref === 'refs/heads/production') {
        run_cmd('sh', [`${basePath}/autopublish/deploy-pull.sh`], d => {
            autoReloadNginx();
            let afterPullPackageJson = fs.readFileSync(`${basePath}/package.json`, 'utf-8');
            if (beforePullPackageJson !== afterPullPackageJson) {
                console.log('do ******* deploy-install-start');
                run_cmd('sh', [`${basePath}/autopublish/deploy-install-start.sh`], e => {
                    gitlog(event.payload, send_email);
                });
            } else {
                console.log('do ******* deploy-normal-start');
                run_cmd('sh', [`${basePath}/autopublish/deploy-normal-start.sh`], e => {
                    gitlog(event.payload, send_email);
                });
            }
        });
    }
});


let server = http.createServer((req, res) => {
    handler(req, res, err => {
        res.statusCode = 404;
        res.end('no such location')
    })
});
server.listen(httpPort);
module.exports = server

process.on('exit', function () {
    let bf = fs.readFileSync('./save_pid.txt')
    let pid = bf.toString('utf8')
    pid = parseInt(pid)
    fs.unlinkSync('./save_pid.txt')
    run_cmd('kill',['-9',pid])
　　console.log('Bye.',process.pid,pid);
});

process.on("uncatchException", function(e) {
    console.log(e);
    process.exit(1);
});