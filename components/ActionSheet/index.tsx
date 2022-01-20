import React, { useRef, useImperativeHandle, memo } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useDisclose, useMount } from '../../hooks'
import Popup, { PopupAction } from "../Popup"
import { unitWidth as UW } from '../../utils/index'

// 使用方式
{/* <ActionSheet
  menu={pieMenu}
  onSelect={(info) => {
    console.log('info:', info)
  }}
  >
  <View>
  <Text>{curPie}</Text>
  </View>
</ActionSheet> */}

interface IActionSheetProps {
  children: React.ReactNode;
  menu: Array<IMenu>;
  tipTxt?: string;
  isShowTip?: boolean;
  cancelTxt?: string;
  isShowCancel?: boolean;
  onSelect?: (val: IMenu) => void;
}

type IMenu = {
  name: string;
  id: string | number | undefined;
  isDisabled?: boolean;
}

const ActionSheet = (props: IActionSheetProps) => {
  const {
    children,
    menu = [],
    tipTxt = '请选择一段描述',
    isShowTip = false,
    cancelTxt = '取消',
    isShowCancel = false,
    onSelect = () => {}
  } = props
  const PopupRef = useRef<PopupAction>(null)

  const handleCancel = () => {
    PopupRef.current?._closePopup()
  }

  useMount(() => {

  })

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        {isShowTip && _renderTip}
        {
          menu.map((val: IMenu) => <Item {...val} />)
        }
        {isShowCancel && _renderCancelBtn}
      </View>
    )
  }

  const Item = (props: IMenu) => {
    const { id, name, isDisabled = false } = props
    
    const handleSelect = () => {
      onSelect({...props})
      PopupRef.current?._closePopup()
    }

    return (
      <TouchableOpacity
        style={[styles.item, styles.space]}
        disabled={isDisabled}
        key={id}
        onPress={handleSelect}>
        <Text>{name}</Text>
      </TouchableOpacity>
    )
  }

  const _renderCancelBtn = (
    <>
      <View style={styles.line}></View>
      <TouchableOpacity
        style={[styles.cancel, styles.space]}
        onPress={handleCancel}
      >
        <Text>{cancelTxt}</Text>
      </TouchableOpacity>
    </>
  )
  
  const _renderTip = (
    <View style={[styles.space, styles.tip]}>
      <Text style={styles.tipTxt}>{tipTxt}</Text>
    </View>
  )

  return (
    <>
      <Popup
        onRef={PopupRef}
        renderContent={_renderContent}
      >
        {children}
      </Popup>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  tip: {
    borderBottomWidth: 1,
    borderColor: '#fafafa'
  },
  tipTxt: {
    color: '#969799',
    fontSize: 22 * UW,
    textAlign: 'center'
  },
  item: {
    alignItems: 'center'
  },
  line: {
    height: 10 * UW,
    backgroundColor: '#f7f8fa'
  },
  cancel: {
    color: '#646566',
    width: '100%',
    alignItems: 'center'
  },
  space: {
    padding: 25 * UW
  }
})

export default memo(ActionSheet)