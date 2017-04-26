/**
 * Created by ken on 2017/4/26.
 */
const Datastore = require('nedb')
const path = require('path')
const rootpath = path.dirname(__dirname)
const db = new Datastore({ filename: `${rootpath}/data/database.db`, autoload: true })
module.exports = db
