import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../../../theme/theme';

interface SeasonRecommendationCardProps {
    id: string;
    imagelink: ImageProps;
    name: string;
}

const SeasonRecommendationCardProps: React.FC<SeasonRecommendationCardProps> = ({
    id,
    imagelink,
    name,
}) => {
    return (
        <View style={styles.container}>
            <View>
                <Image 
                    style={styles.movieImage}
                    source={imagelink}
                    resizeMode='contain'/>
                <Text style={styles.movieName}>
                    {name.length < 15
                        ? `${name}`
                        : `${name.substring(0,15)}...`}
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: SPACING.space_2,
    },
    movieName: {
        color: COLORS.primaryOrangeHex,
        textAlign: 'center'
    },
    movieImage: {
        width: 115,
        height: 138
    }
});

export default SeasonRecommendationCardProps