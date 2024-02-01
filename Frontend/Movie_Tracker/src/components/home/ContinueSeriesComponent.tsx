import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import ContinueCard from './cards/ContinueCard'
import { useStore } from '../../store/store'
import { useCategory } from '../misc/CategoryContent'

const ContinueSeriesComponent = () => {
  const { selectedCategory, selectedColor} = useCategory();
  const { RecommendationList, SerieList } = useStore((state: any) => state);
  
  const ListRef:any = useRef<FlatList>()
  const contentList = selectedCategory === 'movies' ? RecommendationList : SerieList;
  
  return (
    <View style={styles.ContinueSeriesContainer}>
        <StatusBar backgroundColor={COLORS.primaryDarkBlue} />
        <View style={styles.headerContainer}>
          <View style={[styles.TextRowContainer, {borderBottomColor: selectedColor}]}>
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