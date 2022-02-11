import React, { useRef, useImperativeHandle, memo } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Modal,
  StyleProp,
  ViewStyle,
  Image } from "react-native";
import { useDisclose, useMount } from '../../hooks'
import { unitWidth as UW } from '../../utils'
// import { iconClose } from '@/assets'


// 使用方式
{/* <Popup
  renderContent={() => {
    return (
      <View>
        <Text>内容1</Text>
        <Text>内容2</Text>
      </View>
    )
  }}
  >
  <View>
    <Text>按钮</Text>
  </View>
</Popup> */}
// position 定位，弹窗显示的位置，有上 右 下 左

const screenHeight = Dimensions.get("window").height,
      screenWidth = Dimensions.get("window").width

interface IPosition {
  [key: string]: Array<any>
}

type position = 'top' | 'bottom' | 'left' | 'right'

type iconPosition = 'left' | 'middle' | 'right'
type styleProps = StyleProp<ViewStyle> | undefined;

interface IPopupProps {
  children?: React.ReactNode;
  position?: position;
  onRef?: any;
  width?: number;
  renderContent: (props?:any) => React.ReactNode;
  closeIcon?: string;
  iconPosition?: iconPosition;
  iconSize?: number;
  isShowCloseIcon?: boolean;
  round?: boolean;
}

const POSITION:IPosition = {
  'top': [-1 * screenHeight, 0],
  'bottom': [0, -1 * screenHeight],
  'left': [ screenWidth, 0],
  'right': [ -1 * screenWidth, 0 ]
}

const POSITION_STYLE: any = {
  'bottom': {
    top: screenHeight,
    justifyContent: "flex-end"
  }
}

enum ICON_POSITION  {
  left = 'flex-start',
  middle = 'center',
  right = 'flex-end'
}

export type PopupAction = {
  _openPopup: Function,
  _closePopup: Function
}

const Popup = (props: IPopupProps) => {
  const {
    children,
    position = "bottom",
    onRef = null,
    width = 100,
    renderContent = () => null,
    // closeIcon = iconClose,
    closeIcon = '',
    isShowCloseIcon = false,
    iconPosition = 'right',
    iconSize = 50,
    round = false
  } = props
  const animation = useRef<any>(new Animated.Value(0)).current
  const [ isOpen, onOpen, onClose ]: Array<any> = useDisclose()
  const isColumn: boolean = ['top', 'bottom'].includes(position) // 是否是纵向
  const wrapStyle:any = {
    width: width + '%',
    backgroundColor: "#FFF",
  }

  useImperativeHandle(onRef, () => {
    return {
      _openPopup: handleOpen,
      _closePopup: handleClose
    }
  })

  const backdrop = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.01],
          outputRange: [screenHeight, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0.01, 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  }

  const slideUp:any = {
    transform: [
      {
        [`translate${isColumn ? 'Y' : 'X'}`]: animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: POSITION[position],
          extrapolate: "clamp",
        }),
      },
    ],
  }
  
  const handleOpen = () => {
    onOpen()
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  const handleClose = () => {
    console.log('click close...')
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      onClose()
    })
  }

  const trfSpace = () => {
    if (!isColumn) {
      if(width !== 100) {
        const space = 100 - width + '%'
        const marginName = `margin${position === 'left' ? 'Left' : 'Right'}`
        wrapStyle[marginName] = space
      }
    }
  }

  const trfRound = () => {
    if (round) {
      //TODO... 存在bug 待修复
      wrapStyle["borderTopLeftRadius"] = 30
      wrapStyle["borderTopRightRadius"] = 30
      console.log("🚀 ~ file: TestDemo.tsx ~ line 126 ~ trfRound ~ wrapStyle", wrapStyle)
    }
  }

  const renderCloseIcon = () => (
    isShowCloseIcon
      ? <TouchableOpacity onPress={handleClose}>
          <Image
            style={{
              margin: 20 * UW,
              alignSelf: ICON_POSITION[iconPosition],
              width: iconSize * UW,
              height: iconSize * UW
            }}
            source={closeIcon}
          />
        </TouchableOpacity>
      : null
  )

  useMount(() => {
    trfSpace()
    trfRound()
  })

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOpen}>
          {/* TODO...优化，外置一个name名称给外部使用减少外部心智负担 */}
          {children}
        </TouchableOpacity>
        <Modal
          transparent
          hardwareAccelerated
          visible={isOpen}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0)'}]}
            onPress={handleClose}
          >
            <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.cover, backdrop]} />
          </TouchableOpacity>
          <View style={[styles.sheet, POSITION_STYLE[position]]}>
            <Animated.View style={[wrapStyle, slideUp]} >
              {/* {renderCloseIcon()} */}
              {renderContent()}
            </Animated.View>
          </View>
        </Modal>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  sheet: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: "100%",
    justifyContent: "flex-start"
  }
})

export default memo(Popup)