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
      <Text>单个折叠</Text>
      <Collapse isSingle data={testData} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30 * UW,
    paddingVertical: 2 * UW,
    backgroundColor: '#fff'
  },
  arrowIcon: {
    width: 25 * UW,
    height: 25 * UW
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20 * UW,
    borderBottomColor: '#ebedf0',
    borderBottomWidth: 1
  },
  title: {

  },
  body: {
    paddingVertical: 15 * UW,
  }
})

export default memo(TestDemo)