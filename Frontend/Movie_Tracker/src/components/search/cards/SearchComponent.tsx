import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SPACING } from '../../../theme/theme'

const SearchComponent = ({ searchValue, setSearchValue }: any) => {

  return (
    <View style={styles.SearchContainer}>
      <TextInput 
        style={styles.TextInput} 
        clearButtonMode='always'
        autoCapitalize='none'
        autoCorrect={false}
        value={searchValue}
        onChangeText={setSearchValue}
        />
    </View>
  )
}

export default SearchComponent

const styles = StyleSheet.create({
    SearchContainer: {
        marginHorizontal: SPACING.space_20
    },
    TextInput: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: SPACING.space_4,
        borderWidth: 1,
        borderRadius: 6,
    }
})