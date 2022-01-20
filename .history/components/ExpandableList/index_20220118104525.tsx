import React, { memo, useState, useMemo } from 'react'
import { 
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ScrollView,
  FlatList,
  UIManager,
  Platform,
  LayoutAnimation } from 'react-native'
import { unitWidth as UW, isEmpty } from '../../utils'

type initialOpenGroups = Array<number | string> | string | number
type toggleStatus = (index: number) => void
type styleProps = StyleProp<ViewStyle> | undefined;
type groupHeaderData = {
  [key: string]: any
}
type groupListData = Array<groupHeaderData>

interface IHeaderItem {
  status: boolean;
  groupId: number | string;
  item: groupHeaderData;
}
interface IListItem {
  item: groupListData;
  rowId: number;
  groupId: number;
}

export interface IExpandableListProps {
  data: Array<IGroupItem>;
  initialOpenGroups?: initialOpenGroups;
  style?: styleProps;
  groupStyle?: styleProps;
  groupSpacing?: number;
  isSingle?: boolean;
  renderGroupHeader: (obj: IHeaderItem) => React.ReactNode;
  renderGroupListItem: (obj: IListItem) => React.ReactNode;
}

interface IGroupItem {
  groupHeaderData: groupHeaderData;
  groupListData: groupListData;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ExpandableList = (props: IExpandableListProps) => {
  const { 
    data = [],
    initialOpenGroups = [],
    style = undefined,
    groupStyle = undefined,
    groupSpacing = 0,
    renderGroupHeader = () => null,
    renderGroupListItem = () => null,
    isSingle = false
  } = useMemo(() => props, [props.data]) 
  const [curGroupStatus, setCurGroupStatus] = useState<initialOpenGroups>(isSingle ? '' : initialOpenGroups)

  const handleToggleGroupStatus:toggleStatus = (index: number) => {
    let ret:initialOpenGroups = ''
    if (isSingle) {
      ret = curGroupStatus === index ? '' : index
    } else {
      const _curGroupStatus = (curGroupStatus as Array<number | string>)
      const idx = _curGroupStatus.indexOf(index)
      if (idx !== -1) {
        _curGroupStatus.splice(idx, 1)
      }
      ret = idx === -1 ? [..._curGroupStatus, index] : [..._curGroupStatus]
    }
    setCurGroupStatus(ret)
    LayoutAnimation.easeInEaseOut()
  }

  const _renderGroupItem = (groupItem: IGroupItem, groupId: number) => {
    const isArray = Array.isArray(curGroupStatus)
    const status: boolean = isArray 
      ? (curGroupStatus as Array<number | string>).includes(groupId)
      : curGroupStatus === groupId
    const {groupHeaderData = {}, groupListData = []} = groupItem
    const groupHeader = renderGroupHeader && renderGroupHeader({
      status,
      groupId,
      item: groupHeaderData
    })
    const isNilList = isEmpty(groupListData)
    const groupBody = !isNilList && (
      <ScrollView bounces={false} style={!status && {height: 0}}>
        {groupListData.map((listItem: any, index: number) => (
          <View key={`gid:${groupId}-rid:${index}`}>
            {renderGroupListItem && renderGroupListItem({
              item: listItem,
              rowId: index,
              groupId
            })}
          </View>
        ))}
      </ScrollView>
    )
    const isChoose = groupId && groupSpacing
    const chooseStyle:styleProps= isChoose ? {marginTop: groupSpacing} : undefined

    return (
      <View
        key={`group-${groupId}`}
        style={[groupStyle, chooseStyle]}
        >
        <TouchableOpacity onPress={() => {
          handleToggleGroupStatus(groupId)
        }}>
          {groupHeader}
        </TouchableOpacity>
        {groupBody}
      </View>
    )

  }

  const _renderFlatListItem = ({item, index}: any) => _renderGroupItem(item, index)


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={style}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        renderItem={_renderFlatListItem}
      />
    </View>
  );
}

export default memo(ExpandableList)

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 30 * UW,
    paddingVertical: 2 * UW,
    backgroundColor: '#fff',
    width: '100%'
  },
})