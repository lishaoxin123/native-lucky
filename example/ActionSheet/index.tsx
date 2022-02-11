import React, { memo, useState } from "react";
import { View, Text } from "react-native";
import { ActionSheet, IMenu } from '../../component-path'

const testMenu:Array<IMenu> = [
  {
    id: 1,
    name: '测试1',
  },
  {
    id: 2,
    name: '测试2',
  },
  {
    id: 3,
    name: '测试3',
  },
  {
    id: 4,
    name: '测试4',
  },
]

const TestDemo = () => {
  const [curName, setCurName] = useState('测试')
  return (
    <>
      <ActionSheet
        isShowCancel // 显示取消按钮
        isShowTip // 显示提示信息
        tipTxt= "请选择一段描述" // 可选 提示文案
        cancelTxt= "取消" // 可选 取消按钮文案
        menu={testMenu}
        onSelect={(info) => {
          const { name } = info
          setCurName(name)
          // console.log('info:', info)
        }}
        >
        <View>
          <Text>{curName}</Text>
        </View>
      </ActionSheet>
    </>
  )
}
export default memo(TestDemo)