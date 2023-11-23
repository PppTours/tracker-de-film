import React from 'react';
import {ImageProps, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { COLORS, SPACING } from '../../../theme/theme';
import { FONTSIZE } from '../../../theme/theme';

interface RecommendationCardProps {
    id: string;
    imagelink: ImageProps;
    name: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
    id,
    imagelink,
    name,
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {}}>
                <Image 
                    style={styles.movieImage}
                    source={imagelink}
                    resizeMode='contain'/>
                <Text style={styles.movieName}>
                    {name.length < 15
                        ? `${name}`
                        : `${name.substring(0,15)}...`}
                </Text>
            </TouchableOpacity>

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

export default RecommendationCard;
