import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useStore } from '../store/store';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import DescriptionComponent from '../components/info/DescriptionComponent';
import LogoComponent from '../components/home/LogoComponent';
import { ProgressBar } from 'react-native-paper';
import CustomIcon from '../components/CustomIcon';
import RatingComponent from '../components/info/RatingComponent';

const InfoScreen = ({navigation, route}: any) => {
    const ItemOfIndex = useStore((state: any) => state.CompleteList)[route.params.id - 1]

    return (
        <View style={styles.container}>
            <ScrollView style={styles.ScrollView}>
                <LogoComponent />
                <DescriptionComponent 
                    item={ItemOfIndex}/>
                <TouchableOpacity style={styles.UpdateProgress}>
                <Text style={styles.UpdateText}>Update Progress</Text>
                </TouchableOpacity>
                <Text style={styles.EpisodeCount}>Episode 5/8</Text>
                <ProgressBar style={styles.ProgressBar} progress={5/8} color={COLORS.primaryBlue} />
                <TouchableOpacity style={styles.ContentStatus}>
                    <CustomIcon 
                        name='checkmark'
                        size={30}
                        color={COLORS.primaryWhiteHex}
                    />
                    <Text style={styles.ContentStatusText}>In Watchlist</Text>
                    <View style={styles.ExtendMenu}>
                        <CustomIcon 
                            style={styles.ExtendMenuIcon}
                            name='circle-down'
                            size={30}
                            color={COLORS.primaryWhiteHex}
                        />
                    </View>
                </TouchableOpacity>
                <RatingComponent />
            </ScrollView>
        </View>
    );
};

export default InfoScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.backgroundColor,
    },
    ScrollView: {
    },
    UpdateProgress: {
        backgroundColor: COLORS.secondaryLightGreyHex,
        marginLeft: SPACING.space_15,
        marginRight: SPACING.space_15,
        marginTop: SPACING.space_10,
        paddingTop: SPACING.space_8,
        paddingBottom: SPACING.space_8,        
    },
    UpdateText: {
        color: COLORS.primaryWhiteHex,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: FONTSIZE.size_18
    },
    EpisodeCount: {
        color: COLORS.primaryWhiteHex,
        textAlign: 'center',
        paddingBottom: SPACING.space_10,
        paddingTop: SPACING.space_10
    },
    ProgressBar: {
        marginLeft: SPACING.space_15,
        marginRight: SPACING.space_15,
        marginBottom: SPACING.space_15
    },
    ContentStatus: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',

        marginLeft: SPACING.space_15,
        marginRight: SPACING.space_15,
        backgroundColor: COLORS.primaryBlue,
        paddingLeft: SPACING.space_12,
        paddingRight: SPACING.space_12
    },
    ContentStatusText: {
        color: COLORS.primaryWhiteHex,
        textTransform: 'uppercase',
        fontSize: FONTSIZE.size_18,
        paddingTop: SPACING.space_12,
        paddingBottom: SPACING.space_12
    },
    ExtendMenu: {
        borderLeftWidth: 2,
        borderLeftColor: COLORS.secondaryLightGreyHex,
    },
    ExtendMenuIcon: {
        paddingLeft: SPACING.space_8
    }
  })