import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme'
import ShiftCategoryComponent from '../components/misc/ShiftCategoryComponent'
import ContentGridComponent from '../components/search/ContentGridComponent'

const SearchScreen = ({navigation}: any) => {
  return (
    <View style={styles.ScreenContainer}>
      <ScrollView>
        <ShiftCategoryComponent />
        <ContentGridComponent navigation={navigation} />
      </ScrollView>

    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor
  }
})