import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import SeasonRecommendationCard from './cards/SeasonRecommendationCard'

const SeasonRecommendation = ({content, season, navigation}: any) => {
    const ListRef:any = useRef<FlatList>()
  return (
    <View style={styles.RecommandationContainer}>
        <View style={styles.OtherSeasonsContainer}>
            <Text style={styles.OtherSeasonsText}>Other Seasons</Text>
        </View>
        <View style={styles.RecommandationContent}>
        <FlatList
                ref={ListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={content.seasons}
                keyExtractor={item => item.season_id}
                renderItem={({ item }) => (
                    item.season_id !== season.season_id ?
                    <>
                        <TouchableOpacity 
                            key={item.season_id} 
                            onPress={() => {
                                navigation.push('Info', {
                                    id: content.id,
                                    season_id: item.season_id
                                })
                            }}>
    
                          <SeasonRecommendationCard
                            id={item.id}
                            imagelink={item.image_link}
                            name={content.name + " - " + item.season}
                          />
                        </TouchableOpacity>
                    </> : <></>
                  )}
            >
            </FlatList>
        </View>


    </View>
  )
}

export default SeasonRecommendation

const styles = StyleSheet.create({
    RecommandationContainer: {
        margin: SPACING.space_20,
        backgroundColor: COLORS.primaryBlackRGBA,
    },
    OtherSeasonsContainer: {
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 3,
     
        marginTop: SPACING.space_15,
        marginRight: SPACING.space_36,
        marginLeft: SPACING.space_36,
        marginBottom: SPACING.space_15
    },
    OtherSeasonsText: {
        color: COLORS.primaryWhiteHex,
        textTransform: 'uppercase',
        fontSize: FONTSIZE.size_12
    },
    headerContainer: {
        alignItems: 'center'
    },
    TextRowContainer: {
        alignItems: 'center',
        borderBottomColor: COLORS.primaryOrangeHex,
        borderBottomWidth: 3,
        width: '85%',
        paddingBottom: SPACING.space_12
    },
    RecommandationText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_20,
    },
    RecommandationContent: {
        paddingTop: SPACING.space_12,
        marginLeft:  SPACING.space_36,
        marginRight:  SPACING.space_36,
    },
})