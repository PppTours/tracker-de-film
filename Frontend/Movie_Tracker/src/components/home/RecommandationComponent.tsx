import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import { useStore } from '../../store/store'
import RecommendationCard from './cards/RecommendationCard'

const RecommandationComponent = ({navigation}: any) => {
    const RecommendationList = useStore((state: any) => state.RecommendationList)
    const ListRef:any = useRef<FlatList>()
  return (
    <View style={styles.RecommandationContainer}>
        <StatusBar backgroundColor={COLORS.primaryDarkBlue} />
        <View style={styles.headerContainer}>
            <View style={styles.TextRowContainer}>
                <Text style={styles.RecommandationText}>RECOMMENDATION</Text>
            </View>
        </View>

        <View style={styles.RecommandationContent}>
            <FlatList
                ref = {ListRef}
                horizontal
                data={RecommendationList}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return <TouchableOpacity
                        onPress={() => {
                            navigation.push('Info', {
                                id: item.id
                            })
                        }}>
                        <RecommendationCard
                            id={item.id}
                            name={item.name}
                            imagelink={item.image_link}
                        >
                        </RecommendationCard>
                        
                    </TouchableOpacity>
                }}
            ></FlatList>
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
        paddingTop: SPACING.space_12
    },
})