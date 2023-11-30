import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../../store/store'
import { COLORS, SPACING } from '../../theme/theme'
import ContentGridCard from './cards/ContentGridCard'

const ContentGridComponent = ({navigation}: any) => {
    const RecommendationList = useStore((state: any) => state.RecommendationList)
    const NewRecommendationList = MergeSeasonInList(RecommendationList)
    console.log(NewRecommendationList)
    const ListRef:any = useRef<FlatList>()

    function MergeSeasonInList(RecommendationList: any) {
        let movieIndex = 0
        let seasonIndex = 0
        let NewRecommendationList = []
        while ( movieIndex < RecommendationList.length) {
            seasonIndex = 0
            while ( seasonIndex < RecommendationList[movieIndex].seasons.length) {
                NewRecommendationList.push({
                  id: RecommendationList[movieIndex].id,
                  name: RecommendationList[movieIndex].name,
                  category: RecommendationList[movieIndex].category,
                  season_id: RecommendationList[movieIndex].seasons[seasonIndex].season_id,
                  season: RecommendationList[movieIndex].seasons[seasonIndex].season,
                  release_date: RecommendationList[movieIndex].seasons[seasonIndex].release_date,
                  description: RecommendationList[movieIndex].seasons[seasonIndex].description,
                  image_link: RecommendationList[movieIndex].seasons[seasonIndex].image_link,
                })
                seasonIndex++
            }
            movieIndex++
        }
        return NewRecommendationList
    } 

  return (
    <View style={styles.ContentGrid}>
        <FlatList
            ref={ListRef}
            data={NewRecommendationList}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                    <>
                        <TouchableOpacity 
                            key={item.id} 
                            onPress={() => {
                                navigation.push('Info', {
                                    id: item.id,
                                    season_id: item.season_id
                                })
                            }}>
    
                          <ContentGridCard
                            id={item.id}
                            imagelink={item.image_link}
                            name={item.name}
                            season_name={item.season}
                          />
                        </TouchableOpacity>
                    </>
            )}>

        </FlatList>
    </View>
  )
}

export default ContentGridComponent

const styles = StyleSheet.create({
    ContentGrid: {
        marginLeft: SPACING.space_15,
        marginRight: SPACING.space_15
    }
})
