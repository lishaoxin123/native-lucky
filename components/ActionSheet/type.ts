export interface IActionSheetProps {
  children: React.ReactNode;
  menu: Array<IMenu>;
  tipTxt?: string;
  isShowTip?: boolean;
  cancelTxt?: string;
  isShowCancel?: boolean;
  onSelect?: (val: IMenu) => void;
}

export type IMenu = {
  name: string;
  id?: string | number | undefined;
  isDisabled?: boolean;
}