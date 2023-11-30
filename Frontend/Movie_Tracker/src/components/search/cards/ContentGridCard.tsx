import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../../../theme/theme';

interface ContentGridCardProps {
    id: string;
    imagelink: ImageProps;
    name: string;
    season_name: string;
}

const ContentGridCard: React.FC<ContentGridCardProps> = ({
    id,
    imagelink,
    name,
    season_name

}) => {
    return (
        <View style={styles.container}>
            <View style={styles.CardContainer}>
                <Image 
                    style={styles.movieImage}
                    source={imagelink}
                    resizeMode='contain'/>
                <View style={styles.TextContainer}>
                    <Text style={styles.movieName}>
                        {name.length < 10
                            ? `${name}`
                            : `${name.substring(0,10)}...`}
                    </Text>
                    <Text style={styles.SeasonName}>{season_name}</Text>
                    <TouchableOpacity style={styles.AddToCollection}>
                        <Text style={styles.AddToCollectionText}>Add to collection</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.ThinLine}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: SPACING.space_10,
        marginBottom: SPACING.space_20
    },
    CardContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    TextContainer: {
        marginTop: SPACING.space_15,

    },
    movieName: {
        color: COLORS.primaryWhiteHex,
    },
    SeasonName: {
        color: COLORS.secondaryLightGreyHex,
        marginTop: SPACING.space_4,
        fontSize: FONTSIZE.size_12
    },
    movieImage: {
        width: 80,
        height: 96
    },
    AddToCollection: {
        marginTop: 'auto',
        backgroundColor: COLORS.primaryBlue,
        paddingTop: SPACING.space_2,
        paddingBottom: SPACING.space_2,
        paddingRight: SPACING.space_8,
        paddingLeft: SPACING.space_8,
        borderRadius: BORDERRADIUS.radius_10,
    },
    AddToCollectionText: {
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    ThinLine: {
        alignItems: 'center',
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 1,
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        paddingBottom: SPACING.space_12
    }
});

export default ContentGridCard