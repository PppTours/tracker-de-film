import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import ContinueCard from './cards/ContinueCard'
import { useStore } from '../../store/store'

const ContinueSeriesComponent = ({navigation, category}: any) => {
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
    <View style={styles.ContinueSeriesContainer}>
        <StatusBar backgroundColor={COLORS.primaryDarkBlue} />
        <View style={styles.headerContainer}>
          <View style={[styles.TextRowContainer, {borderBottomColor: category === 'movies' ? COLORS.primaryOrangeHex : COLORS.primaryBlue}]}>
                <Text style={styles.ContinueSeriesText}>CONTINUE SERIES</Text>
            </View>
        </View>

        <View style={styles.ContinueSeriesContent}>
            <FlatList
                ref={ListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={contentList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <>
                      {item.seasons.map((season: any) => (
                        <TouchableOpacity key={season.season_id} onPress={() => {}}>
                          <ContinueCard
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

export default ContinueSeriesComponent

const styles = StyleSheet.create({
    ContinueSeriesContainer: {
        margin: SPACING.space_20,
        padding: SPACING.space_15,
        backgroundColor: COLORS.primaryBlackRGBA,
        marginBottom: 100
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
    ContinueSeriesText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_20,
    },
    ContinueSeriesContent: {

    },
    ScrollViewFlex: {

    }
})