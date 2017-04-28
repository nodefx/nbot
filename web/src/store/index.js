/**
 * Created by ken on 2017/4/11.
 */
import memberStore from 'store/common/member'
import menuStore from 'store/common/menu'
export const store = {
  memberStore,
  menuStore
}

export const registerModule = function (StoreName, StoreClass) {
  store[StoreName] = new StoreClass()
}


Object.keys(store).map((key) => {
  registerModule(key, store[key])
})


