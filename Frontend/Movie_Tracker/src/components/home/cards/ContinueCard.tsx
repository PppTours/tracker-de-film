import React from 'react';
import {ImageProps, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { COLORS, SPACING } from '../../../theme/theme';
import { FONTSIZE } from '../../../theme/theme';

interface ContinueCardProps {
    id: string;
    imagelink: ImageProps;
    name: string;
    category: string;
}

const ContinueCard: React.FC<ContinueCardProps> = ({
    id,
    imagelink,
    name,
    category,
}) => {
    return (
        <View style={[styles.container, {backgroundColor: category === 'movies' ? COLORS.primaryOrangeHex : COLORS.primaryBlue}]}>
            <Image
                style={styles.movieImage}
                source={imagelink} 
                resizeMode='contain' />
            <View>
                <Text 
                    style={styles.movieName}>
                    {name.length < 15
                        ? `${name}`
                        : `${name.substring(0,15)}...`}
                </Text>
                <Text style={styles.serieProgression}>Season 2 - Episode 3</Text>
                <TouchableOpacity
                    onPress={() => {}}
                    style={styles.changeProgression}>
                    <Text style={styles.changeProgressionText}>Update Progress</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        padding: SPACING.space_10,
        margin : SPACING.space_12
    },
    movieImage: {
        width: 80,
        height: 100
    },
    movieName: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_18,
        paddingBottom: SPACING.space_10,
        textTransform: 'uppercase'
    },
    serieProgression: {
        textTransform: 'uppercase',
        fontSize: FONTSIZE.size_12,
    },
    changeProgression: {
        marginTop: 'auto',
        backgroundColor: COLORS.primaryWhiteHex,
        padding: SPACING.space_4
    },
    changeProgressionText: {
        textAlign: 'center',
        color: COLORS.primaryBlackHex
    }
});

export default ContinueCard;
