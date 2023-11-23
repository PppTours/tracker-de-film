import { FlatList, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import { useStore } from '../../store/store'
import WatchlistCard from './cards/WatchlistCard'

const WatchlistComponent = () => {
    const WatchList = useStore((state: any) => state.WatchList)
    const ListRef:any = useRef<FlatList>()
  return (
    <View style={styles.WatchlistContainer}>
        <StatusBar backgroundColor={COLORS.primaryDarkBlue} />
        <View style={styles.headerContainer}>
            <View style={styles.TextRowContainer}>
                <Text style={styles.WatchlistText}>WATCHLIST</Text>
            </View>
        </View>

        <View style={styles.WatchlistContent}>
            <FlatList
                ref={ListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={WatchList}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={() => {}}>
                        <WatchlistCard
                            id={item.id}
                            category={item.category}
                            imagelink={item.image_link}
                            name={item.name}
                        ></WatchlistCard>
                    </TouchableOpacity>
                }}
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
        borderBottomColor: COLORS.primaryOrangeHex,
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