import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../../theme/theme'

const ShiftCategoryComponent = () => {
    const [category, setCategory] = useState("Movies")
    
  return (
    <View style={styles.ShiftContainer}>
        <TouchableOpacity 
            style={
                styles.ButtonMoviesStyle, category !== "Movies" ? 
                styles.ButtonInactiveStyle : styles.ButtonMoviesStyle}
            onPress= {() => {
                setCategory("Movies")
            }}
            >
            <Text style={styles.TextStyle}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.ButtonSeriesStyle, category !== "Series" ? 
            styles.ButtonInactiveStyle : styles.ButtonSeriesStyle}
            onPress= {() => {
                setCategory("Series")
            }}
            >
            <Text style={styles.TextStyle}>Series</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ShiftCategoryComponent

const styles = StyleSheet.create({
    ShiftContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: SPACING.space_12,
        marginTop: SPACING.space_15,
        marginBottom: SPACING.space_15,
        marginLeft: SPACING.space_24,
        marginRight: SPACING.space_4

    },
    TextStyle: {
        textTransform: 'uppercase',
        color: COLORS.primaryWhiteHex,
        textAlign: 'center',
        fontSize: FONTSIZE.size_16
    },
    ButtonMoviesStyle: {
        width: '45%',
        paddingTop: SPACING.space_10,
        paddingBottom: SPACING.space_10,
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: BORDERRADIUS.radius_10,
    },
    ButtonSeriesStyle: {
        width: '45%',
        paddingTop: SPACING.space_10,
        paddingBottom: SPACING.space_10,
        backgroundColor: COLORS.primaryBlue,
        borderRadius: BORDERRADIUS.radius_10       
    },
    ButtonInactiveStyle: {
        width: '45%',
        paddingTop: SPACING.space_10,
        paddingBottom: SPACING.space_10,
        backgroundColor: COLORS.backgroundColor,
        borderRadius: BORDERRADIUS.radius_10  
    }
})