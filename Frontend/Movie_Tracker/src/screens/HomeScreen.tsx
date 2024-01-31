import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../theme/theme'
import LogoComponent from '../components/home/LogoComponent'
import WatchlistComponent from '../components/home/WatchlistComponent'
import RecommandationComponent from '../components/home/RecommandationComponent'
import ContinueSeriesComponent from '../components/home/ContinueSeriesComponent'
import ShiftCategoryComponent from '../components/misc/ShiftCategoryComponent'

const HomeScreen = ({navigation}: any) => {

  const [selectedCategory, setSelectedCategory] = useState('movies')

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  return (
    <View style={styles.ScreenContainer}>
        <LogoComponent />
        <ShiftCategoryComponent onCategoryChange={handleCategoryChange}/>
        <ScrollView>
          <RecommandationComponent navigation={navigation} category={selectedCategory}/>
          <WatchlistComponent category={selectedCategory}/>
          <ContinueSeriesComponent category={selectedCategory}/>
        </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  }
})