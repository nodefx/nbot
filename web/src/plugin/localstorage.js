var storage = window.localStorage

function isJSON(obj) {
  var checkjson = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() == '[object object]' && !obj.length
  return checkjson
}

export default {
  set(name, value) {
    if (isJSON(value))value = JSON.stringify(value)
    return storage.setItem(name, value)
  },
  get(name) {
    let data = storage.getItem(name)||`{}`
    try {
      data = JSON.parse(data)
    } catch (e) {

    }
    return data
  },
  remove(name) {
    return storage.removeItem(name)
  }

}
