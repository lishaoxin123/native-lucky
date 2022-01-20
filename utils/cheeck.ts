/**
 * 判断obj对象是否为空
 * @method isEmptyObject
 * @param { * } val 需要判断的对象
 * @remind 判断当前对象是否存在,去除{}的情况
 * @return { Boolean } 对象是否为空
 */
 export const isEmptyObject = (val: Object) => {
  return val && Object.keys(val).length === 0 && val.constructor === Object
}

/**
 * 判断是否为为对象
 * @method isObject
 * @param { any } val 需要被判断val
 * @remind 如果是对象返回true,否则返回false
 * @return { Boolean }  true 对象 false 非对象
 */
export const isObject = (val: any) => val !== null && typeof val === 'object';

/**
 * 判断数组是否为空
 * @method isEmptyArray
 * @param { * } val 需要判断的数组
 * @remind 如果不是数组都返回false，如果是数组并且长度大于0返回true，否则返回false
 * @return { Boolean } true 是数组&长度大于0 false 非数组｜长度<=0
 */
export const isEmptyArray = (val:Array<any>) => {
  if (!isArray(val)) return false
  const _isEmpty = val.length > 0
  return _isEmpty
}

/**
 * 检查对象中是否存在key
 * @method isHasOwnProperty
 * @param { Object } obj 检查的对象
 * @param { string } key 检查的键
 * @remind 如果当前对象中存在这个key就返回true,否则返回false
 * @return { Boolean } true 当前对象中存在key false 不存在key
 */
export const isHasOwnProperty = (obj:Object, key: string) => Object.prototype.hasOwnProperty.call(obj, key)

/**
 * 判断是否为数组
 * @method isArray
 * @param { any } arr 需要被判断key
 * @remind 如果是数组返回true,否则返回false
 * @return { Boolean } true 数组 false 非数组
 */
export const isArray = (arr:Array<any>) => Array.isArray(arr)

/**
 * 判断是否为字符串
 * @method isString
 * @param { any } str 需要被判断str
 * @remind 如果是字符串返回true,否则返回false
 * @return { Boolean } true 字符串 false 非字符串
 */
export const isString = (str: string) => typeof str === 'string'

/**
 * 判断是否为数字
 * @method isNumber
 * @param { any } num 需要被判断num
 * @remind 如果是数字类型返回true,否则返回false
 * @return { Boolean } true 数字 false 非数字
 */
export const isNumber = (num: number) => typeof num === 'number'

/**
 * 判断是否为函数
 * @method isFunc
 * @param { any } val 需要被判断val
 * @remind 如果是函数类型返回true,否则返回false
 * @return { Boolean } true 函数 false 非函数
 */
export const isFunc = (val:any) => typeof val === 'function';

/**
* 检测当前数组中是否存在key
* @param {Array} arr 需要验证的数组数据
* @param {any} key 需要检测是否包含在当前数组中的值
* @returns true 存在 false 不存在
*/
export const isContain = (arr:Array<any>, key:any) => arr.includes(key)

/**
* 判断当前值是否为空
* @param {any} val 需要判断的值
* @returns true 空 false 非空
*/
export const isEmpty = (val: any) => {
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    case '[object String]':
    case '[object Array]':
      return !val.length

    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }

    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}