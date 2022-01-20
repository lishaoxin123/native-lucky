import { 
  StyleProp,
  ViewStyle,
 } from 'react-native'
type initialOpenGroups = Array<number | string> | string | number
export type toggleStatus = (index: number) => void
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

export interface IGroupItem {
  groupHeaderData: groupHeaderData;
  groupListData: groupListData;
}