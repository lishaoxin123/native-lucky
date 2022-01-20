import { Dimensions, Platform, PixelRatio } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
// UI设计图的宽度
const designWidth = 750
// UI设计图的高度
const designHeight = 1334

// 手机屏幕的宽度
export const deviceWidth = Dimensions.get('window').width
// 手机屏幕的高度
export const deviceHeight = Dimensions.get('window').height
export const deviceFullScreenHeight = Dimensions.get('screen').height
export const deviceFullScreenWidth = Dimensions.get('screen').width
// 计算手机屏幕宽度对应设计图宽度的单位宽度
export const unitWidth = deviceWidth / designWidth
// 计算手机屏幕高度对应设计图高度的单位高度
export const unitHeight = deviceHeight / designHeight
const pixelRatio = PixelRatio.get() // 当前设备的像素密度
export const RPX = 1 / pixelRatio

const X_width = 375
const X_height = 812

export const IsIPhoneX =
  Platform.OS === 'ios' &&
  ((deviceHeight >= X_height && deviceWidth >= X_width) ||
    (deviceHeight >= X_width && deviceWidth >= X_height))

export function isIPhoneXPaddTop(number: any) {
  if (Platform.OS === 'ios') {
    const temNumber = number === 0 ? 0 : number
    return parseInt(temNumber, 10) + (IsIPhoneX ? 44 : 20)
  }
  return parseInt(number, 10)
}

export const BOTTOM_MENU_BAR_HEIGHT = (() => {
  if (IsIPhoneX) {
    return 34
  }
  if (Platform.OS === 'ios') {
    return 0
  }
  if (Platform.OS === 'android') {
    return 0
  }
})()

export const scaleSize = (size: number) => {
  const scaleWidth = deviceWidth / 750
  const scaleHeight = deviceHeight / 1334
  const scale = Math.min(scaleWidth, scaleHeight)
  size = Math.round(size * scale + 0.5)
  return size
}
export function keyboardShowViewScroll() {
  if (getBottomSpace() > 0 && Platform.OS === 'ios') {
    return true
  } else {
    return false
  }
}
