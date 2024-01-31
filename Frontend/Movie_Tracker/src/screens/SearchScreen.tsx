import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../theme/theme'
import ShiftCategoryComponent from '../components/misc/ShiftCategoryComponent'
import ContentGridComponent from '../components/search/ContentGridComponent'

const SearchScreen = ({navigation}: any) => {
  const [selectedCategory, setSelectedCategory] = useState('movies')

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  return (
    <View style={styles.ScreenContainer}>
      <ScrollView>
        <ShiftCategoryComponent onCategoryChange={handleCategoryChange}/>
        <ContentGridComponent navigation={navigation} selectedCategory={selectedCategory}/>
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