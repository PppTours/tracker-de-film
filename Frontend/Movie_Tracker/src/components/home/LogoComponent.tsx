import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SPACING } from '../../theme/theme'

const LogoComponent = () => {
  return (
    <View style={styles.MovieContainer}>
        <Image source={require('../../assets/app_images/movielogo.png')}></Image>
    </View>
  )
}

export default LogoComponent

const styles = StyleSheet.create({
    MovieContainer: {
        alignItems: 'center',
        paddingTop: SPACING.space_4,
      }
})