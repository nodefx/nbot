var EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits,
    crypto = require('crypto'),
    allEvents = {
        "*": "*",
        "push": "Push Hook",
        "tag_push": "Tag Push Hook",
        "merge": "Merge Request Hook",
        "issue": "Issue Hook"
    },
    bl = require('bl')
function signBlob(key, blob) {
    return 'sha1=' + crypto.createHmac('sha1', key).update(blob).digest('hex')
}
function create(options) {
    var events
    if (typeof options != 'object')
        throw new TypeError('must provide an options object')
    if (typeof options.path != 'string')
        throw new TypeError('must provide a \'path\' option')
    // if (typeof options.secret != 'string')
    //     throw new TypeError('must provide a \'secret\' option')
    if (typeof options.events == 'string' && options.events != '*') {
        events = [options.events]
    } else if (Array.isArray(options.events) && options.events.indexOf('*') == -1) {
        events = options.events
    } else {
        events = Object.keys(allEvents)
    }
    // make it an EventEmitter, sort of
    handler.__proto__ = EventEmitter.prototype
    EventEmitter.call(handler)
    return handler
    function handler(req, res, callback) {
        if (req.url.split('?').shift() !== options.path)
            return callback()
        
        function hasError(msg) {
            res.writeHead(400, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: msg }))
            var err = new Error(msg)
            //handler.emit('error', err, req)
            callback(err)
        }
        /*var event = req.headers['x-gitlab-event']
        
        if (!event) {
            return hasError('No x-gitlab-event found on request')
        }
        
        if (events && events.indexOf(event) == -1) {
            return hasError('x-gitlab-event is not acceptable')
        }*/
        var event = ''
        req.pipe(bl(function (err, data) {
            if (err) {
                return hasError(err.message)
            }
            
            var obj
            try {
                obj = JSON.parse(data.toString())
            } catch (e) {
                return hasError(e)
            }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end('{"ok":true}')
            obj = obj||{}
            if(obj.object_kind){
                event = obj.object_kind
            }else if(obj.repository){
                event = 'push'
            }
            
            var emitData = {
                event: event,
                payload: obj,
                protocol: req.protocol,
                host: req.headers['host'],
                url: req.url
            }
            handler.emit(event, emitData)
            //handler.emit('*', emitData)
        }))
    }
}
module.exports = create