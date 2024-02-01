import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../theme/theme'
import ShiftCategoryComponent from '../components/misc/ShiftCategoryComponent'
import ContentGridComponent from '../components/search/ContentGridComponent'
import LogoComponent from '../components/home/LogoComponent'
import SearchComponent from '../components/search/cards/SearchComponent'

const SearchScreen = ({navigation}: any) => {
  const [searchValue, setSearchValue] = useState("")
  return (
    <View style={styles.ScreenContainer}>
      <LogoComponent/>
      <SearchComponent searchValue={searchValue} setSearchValue={setSearchValue}/>
      <ShiftCategoryComponent/>
      <ScrollView>
        <ContentGridComponent 
          navigation={navigation} 
          searchValue={searchValue} 
        />
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