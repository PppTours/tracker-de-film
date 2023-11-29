import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'


const DescriptionComponent = ({item, season}: any) => {

  return (

    <View style={styles.DescriptionContainer}>
        <Image
            style={styles.MainImage}
            source={season.image_link} 
            resizeMode='contain' />
        <Text style={styles.MainTitle}>{item.name}</Text>
        <Text style={styles.SubTitle}>{season.season}</Text>
        <Text style={styles.SubTitle}>Release date : {season.release_date}</Text>
        <View style={styles.CategoryContainer}>
            {item.category.map((singleCategory: string) => {
                return(
                    <Text style={styles.CategoryName}>{singleCategory}</Text>
                )
            })}
        </View>

        <Text style={styles.DescriptionTag}>Description</Text>
        <View style={styles.ThinLine}></View>
        <Text style={styles.ItemDescription}>{season.description}</Text>
    </View>
  )
}

export default DescriptionComponent

const styles = StyleSheet.create({
    DescriptionContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        margin: SPACING.space_15,
    },
    MainTitle: {
        fontSize: FONTSIZE.size_28,
        textAlign: 'center',
        color: COLORS.primaryWhiteHex
    },
    SubTitle: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
        paddingBottom: SPACING.space_4,
        textAlign: 'center',
    },
    MainImage: {
        alignSelf: 'center',
        height: 180,
        width: '60%',
        marginTop: SPACING.space_12
    },
    ContentName: {
        color: COLORS.primaryWhiteHex,
        textAlign: 'center'
    },
    CategoryContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: SPACING.space_15,
        alignSelf: 'center',
        paddingTop: SPACING.space_10
    },
    CategoryName: {
        color: COLORS.primaryWhiteHex,
        backgroundColor: COLORS.secondaryLightGreyHex,
        paddingTop: SPACING.space_4,
        paddingBottom: SPACING.space_4, 
        paddingRight: SPACING.space_12,
        paddingLeft: SPACING.space_12       
    },
    ThinLine: {
        alignItems: 'center',
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 3,
        width: '82%',
        marginLeft: SPACING.space_24,
        paddingBottom: SPACING.space_12
    },
    ItemDescription: {
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
        paddingTop: SPACING.space_8,
        paddingLeft: SPACING.space_36,
        paddingRight: SPACING.space_36,
    },
    DescriptionTag: {
        color: COLORS.primaryBlue,
        paddingLeft: SPACING.space_28,
        paddingTop: SPACING.space_12,
        fontWeight: '800'
    }
})