import React from 'react'
import { Text, View } from 'react-native'
import { TestCollapse, TestActionSheet } from '../example'


const TabOne = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <TestCollapse /> */}
      <TestActionSheet />
    </View>
  );
}

export default TabOne