import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import ContinueCard from './cards/ContinueCard'
import { useStore } from '../../store/store'

const ContinueSeriesComponent = ({navigation}: any) => {
    const ContinueList = useStore((state: any) => state.ContinueList)
    const ListRef:any = useRef<FlatList>()
  return (
    <View style={styles.ContinueSeriesContainer}>
        <StatusBar backgroundColor={COLORS.primaryDarkBlue} />
        <View style={styles.headerContainer}>
            <View style={styles.TextRowContainer}>
                <Text style={styles.ContinueSeriesText}>CONTINUE SERIES</Text>
            </View>
        </View>

        <View style={styles.ContinueSeriesContent}>
            <FlatList
                ref={ListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={ContinueList}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={() => {}}>
                        <ContinueCard
                            id={item.id}
                            imagelink={item.image_link}
                            name={item.name}
                        ></ContinueCard>
                    </TouchableOpacity>
                }}
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
        borderBottomColor: COLORS.primaryOrangeHex,
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