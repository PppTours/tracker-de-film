import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme'
import LogoComponent from '../components/home/LogoComponent'
import WatchlistComponent from '../components/home/WatchlistComponent'
import RecommandationComponent from '../components/home/RecommandationComponent'
import ContinueSeriesComponent from '../components/home/ContinueSeriesComponent'

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.ScreenContainer}>
        <LogoComponent />
        <ScrollView>
          <RecommandationComponent />
          <WatchlistComponent />
          <ContinueSeriesComponent navigation={navigation} />
        </ScrollView>


        
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkBlue,
  }
})