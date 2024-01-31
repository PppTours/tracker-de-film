import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import { useStore } from '../../store/store'
import RecommendationCard from './cards/RecommendationCard'

const RecommandationComponent = ({navigation, category}: any) => {
    const MovieList = useStore((state: any) => state.RecommendationList)
    const SerieList = useStore((state: any) => state.SerieList)
    const ListRef:any = useRef<FlatList>()
    const [contentList, setContentList] = useState(MovieList)

    useEffect(() => {
      if (category == 'movies') {
        setContentList(MovieList)
      } else {
        setContentList(SerieList)
      }
    }, [category])

  return (
    <View style={styles.RecommandationContainer}>
        <StatusBar backgroundColor={COLORS.primaryDarkBlue} />
        <View style={styles.headerContainer}>
            <View style={[styles.TextRowContainer, {borderBottomColor: category === 'movies' ? COLORS.primaryOrangeHex : COLORS.primaryBlue}]}>
                <Text style={styles.RecommandationText}>RECOMMENDATION</Text>
            </View>
        </View>

        <View style={styles.RecommandationContent}>
        <FlatList
                ref={ListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={contentList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <>
                      {item.seasons.map((season: any) => (
                        <TouchableOpacity 
                            key={season.season_id} 
                            onPress={() => {
                                navigation.push('Info', {
                                    id: item.id,
                                    season_id: season.season_id
                                })
                            }}>
    
                          <RecommendationCard
                            id={item.id}
                            imagelink={season.image_link}
                            name={item.name}
                            category={category}
                          />
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
            >
            </FlatList>
        </View>


    </View>
  )
}

export default RecommandationComponent

const styles = StyleSheet.create({
    RecommandationContainer: {
        margin: SPACING.space_20,
        backgroundColor: COLORS.primaryBlackRGBA,
    },
    headerContainer: {
        alignItems: 'center'
    },
    TextRowContainer: {
        alignItems: 'center',
        borderBottomWidth: 3,
        width: '85%',
        paddingBottom: SPACING.space_12
    },
    RecommandationText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_20,
    },
    RecommandationContent: {
        paddingTop: SPACING.space_12
    },
})