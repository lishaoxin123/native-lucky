import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";

import { unitWidth as UW } from '../../utils'
import { ExpandableList } from '../../component-path'
import { ICollapseProps } from "./type";
import {
  Svg,
  Defs,
  LinearGradient,
  Stop,
  Mask,
  Rect,
  G,
  Circle,
  ForeignObject,
} from 'react-native-svg';
// import { arrowDown } from '@/assets'


const _renderGroupHeader = ({
  status,
  groupId,
  item,
}: any) => {
  const { title } = item
  // console.log('header render....')
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="9545" width="76" height="76"><path d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z" fill="#444444" p-id="9546"></path></Svg>
      {/* <Image
        style={styles.arrowIcon}
        source={arrowDown}
      /> */}
    </View>
  )
}

const _renderGroupListItem = ({
  item,
  rowId,
  groupId
}: any) => {
  // console.log('内容render。。。')
  // console.log('item:', item)
  const { content } = item
  return (
    <View style={styles.body}>
      <Text style={styles.bodyTxt}>{content}</Text>
    </View>
  )
}

const Collapse = (props: ICollapseProps) => {
  const { data, isSingle = false } = props
  return (
    <>
      <ExpandableList
        data={data}
        isSingle={isSingle}
        renderGroupHeader={_renderGroupHeader}
        renderGroupListItem={_renderGroupListItem}
      />
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
  },
  bodyTxt: {
    color: '#969799'
    // color: 'red',
    // backgroundColor: 'red'
  }
})

export default memo(Collapse)