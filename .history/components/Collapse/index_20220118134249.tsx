import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";

import { unitWidth as UW } from '../../utils'
import { ExpandableList } from '../../component-path'
import { ICollapseProps } from "./type";
// import { arrowDown } from '@/assets'
export type { ICollapseProps } from './type'


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
      {/* <Image
        style={styles.arrowIcon}
        source={arrowDown}
      /> */}
    </View>
  )
}

const _renderGroupListItem = memo(({
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
})

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