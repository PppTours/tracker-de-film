import React from 'react';
import {ImageProps, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { COLORS, SPACING } from '../../../theme/theme';
import { FONTSIZE } from '../../../theme/theme';

interface RecommendationCardProps {
    id: string;
    imagelink: ImageProps;
    name: string;
    color: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
    id,
    imagelink,
    name,
    color
}) => {
    return (
        <View style={styles.container}>
            <View>
                <Image 
                    style={styles.movieImage}
                    source={imagelink}
                    resizeMode='contain'/>
                <Text style={[styles.movieName, {color: color}]}>
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
        textAlign: 'center'
    },
    movieImage: {
        width: 115,
        height: 138
    }
});

export default RecommendationCard;
