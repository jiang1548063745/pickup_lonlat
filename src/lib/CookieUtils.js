/**
 *  Cookie工具类
 */
import Cookies from 'js-cookie'

const cookies = {}

/**
 * @description 存储 Cookie 值
 * @param name
 * @param value
 * @param cookieSetting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  // 声明 Cookie默认过期时间
  let currentCookieSetting = {
    expires: 1
  }

  // 合并 Cookie 配置
  Object.assign(currentCookieSetting, cookieSetting)
  // 设置 Cookie 值
  Cookies.set(name, value, currentCookieSetting)
}

/**
 * @description 获取Cookie的值
 * @param name
 * @returns {*}
 */
cookies.get = (name = 'default') => {
  Cookies.get(name)
}

/**
 * @description 获取 Cookie的所有值
 * @returns {*}
 */
cookies.getAll = () => {
  Cookies.get()
}

/**
 * @description 移除 Cookie 的值
 * @param name
 */
cookies.remove = (name = 'default') => {
  Cookies.remove(name)
}
