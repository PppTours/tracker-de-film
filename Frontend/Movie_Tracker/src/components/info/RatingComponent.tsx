import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import { Rating } from 'react-native-ratings'
import { TextInput } from 'react-native-paper'

const RatingComponent = () => {
  return (
    <View style={styles.RatingContainer}>
        <View style={styles.RatingTextContainer}>
            <Text style={styles.RatingText}>Rating</Text>
        </View>
        <Rating 
            type='custom'
            ratingCount={5}
            imageSize={35}
            ratingColor={COLORS.primaryBlue}
            tintColor={COLORS.backgroundColor}
            fractions={1}
            jumpValue={0.5}
            />
            <TextInput 
                style={styles.TextInput}
                textColor={COLORS.secondaryLightGreyHex}
                placeholder="Review comment"
                placeholderTextColor={COLORS.secondaryLightGreyHex}
                multiline
                />
    </View>

  )
}

export default RatingComponent

const styles = StyleSheet.create({
    RatingContainer: {
        paddingBottom: SPACING.space_36
    },
    RatingTextContainer: {
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 3,
     
        marginTop: SPACING.space_15,
        marginRight: SPACING.space_36,
        marginLeft: SPACING.space_36,
        marginBottom: SPACING.space_15
    },
    RatingText: {
        color: COLORS.primaryWhiteHex,
        textTransform: 'uppercase',
        fontSize: FONTSIZE.size_12
    },
    TextInput: {
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: COLORS.secondaryLightGreyHex,
        marginTop: SPACING.space_15,
        marginLeft: SPACING.space_36,
        marginRight: SPACING.space_36,
        fontSize: FONTSIZE.size_12,
        textAlign: 'center',
    }
})