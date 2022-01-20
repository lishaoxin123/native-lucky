type groupDataItem = {
  [key: string]: any;
}
type groupListData = Array<groupDataItem>;

export interface ICollapseProps {
  data: Array<{groupHeaderData: groupDataItem, groupListData: groupListData}>;
  isSingle?: boolean
}
