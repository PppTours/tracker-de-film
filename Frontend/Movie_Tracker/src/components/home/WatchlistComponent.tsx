import { FlatList, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import { useStore } from '../../store/store'
import WatchlistCard from './cards/WatchlistCard'
import { useCategory } from '../misc/CategoryContent'

const WatchlistComponent = () => {
  const { selectedCategory, selectedColor} = useCategory();
  const { RecommendationList, SerieList } = useStore((state: any) => state);
  
  const ListRef:any = useRef<FlatList>()
  const contentList = selectedCategory === 'movies' ? RecommendationList : SerieList;

  return (
    <View style={styles.WatchlistContainer}>
        <StatusBar backgroundColor={COLORS.primaryDarkBlue} />
        <View style={styles.headerContainer}>
            <View style={[styles.TextRowContainer, {borderBottomColor: selectedColor}]}>
                <Text style={styles.WatchlistText}>WATCHLIST</Text>
            </View>
        </View>

        <View style={styles.WatchlistContent}>
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
                          <WatchlistCard
                                  id={item.id}
                                  imagelink={season.image_link}
                                  name={item.name} 
                                  category={item.category}
                                  color={selectedColor}                          
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

export default WatchlistComponent

const styles = StyleSheet.create({
    WatchlistContainer: {
        margin: SPACING.space_20,
        padding: SPACING.space_15,
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
    WatchlistText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_20,
    },
    WatchlistContent: {

    },
    ScrollViewFlex: {

    }
})