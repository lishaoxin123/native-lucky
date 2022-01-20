import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";

import { unitWidth as UW } from '../../utils'
import { Collapse } from '../../component-path'
// import { arrowDown } from '@/assets'



const TestDemo = (props: any) => {
  const testData = [
    {
      groupHeaderData: {
        title: '标题1'
      },
      groupListData: [
        {
          content: '内容1'
        },
        {
          content: '内容2'
        },
        {
          content: '内容3'
        },
      ]
    },
    {
      groupHeaderData: {
        title: '标题2'
      },
      groupListData: [
        {
          content: '内容1'
        },
        {
          content: '内容2'
        },
        {
          content: '内容3'
        },
      ]
    },
  ]

  return (
    <>
      <Text>多个折叠</Text>
      <Collapse data={testData} />
      <Text style={{margin: 10}}>单个折叠</Text>
      <Collapse isSingle data={testData} />
    </>
  )
}
export default memo(TestDemo)