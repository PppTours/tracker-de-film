import React from 'react';
import {ImageProps, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { COLORS, SPACING } from '../../../theme/theme';
import { FONTSIZE } from '../../../theme/theme';

interface WatchlistCardProps {
    id: string;
    imagelink: ImageProps;
    name: string;
    category: string[];
    color: string;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({
    id,
    imagelink,
    name,
    category,
    color
}) => {
    console.log("category:", category)
    return (
        <View style={[styles.container, { backgroundColor: color}]}>
            <View style={styles.flexContainer}>
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
                    {category.map((singleCategory) => {
                        return(
                            <Text style={styles.category}>{singleCategory}</Text>
                        )
                    })}
                </View>
            </View>
            <View style={styles.ModifButtonsView}>
                <TouchableOpacity
                    onPress={() => {}}
                    style={styles.ModifButtons}>
                    <Text style={styles.ModifButtonsText}>Update Progress</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    style={styles.ModifButtons}>
                    <Text style={styles.ModifButtonsText}>Finished</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: SPACING.space_10,
        margin : SPACING.space_12
    },
    flexContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
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
    category: {
        color: COLORS.primaryWhiteHex,
        backgroundColor: COLORS.primaryBlackHex,
        padding: SPACING.space_4,
        marginTop: SPACING.space_4,
        textAlign: 'center',
    },
    ModifButtons: {
        backgroundColor: COLORS.primaryWhiteHex,
        padding: SPACING.space_4,
        marginTop: SPACING.space_12
    },
    ModifButtonsText: {
        color: COLORS.primaryBlackHex,
        textAlign: 'center'
    },
    ModifButtonsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: SPACING.space_10
    }
});

export default WatchlistCard;
