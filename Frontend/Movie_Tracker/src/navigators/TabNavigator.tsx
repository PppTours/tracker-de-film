import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, FONTSIZE } from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomIcon from '../components/CustomIcon';
import { useCategory } from '../components/misc/CategoryContent';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { selectedColor } = useCategory();
  return (
    <Tab.Navigator screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: selectedColor,
        tabBarInactiveTintColor: COLORS.primaryWhiteHex,
        tabBarLabelStyle: {
            fontSize: FONTSIZE.size_14
        }
    }}>
    <Tab.Screen name='Home' component={HomeScreen} options={{

        tabBarIcon: ({focused}) => (
            <CustomIcon 
                name='home' 
                size={25} 
                color={focused?selectedColor:COLORS.primaryWhiteHex} 
            />
        )
    }}></Tab.Screen>
    <Tab.Screen name='Search' component={SearchScreen} options={{
        tabBarIcon: ({focused}) => (
            <CustomIcon 
                name='search' 
                size={25} 
                color={focused?selectedColor:COLORS.primaryWhiteHex} 
            />
        )
    }}></Tab.Screen>
    <Tab.Screen name='Collection' component={CollectionScreen} options={{
        tabBarIcon: ({focused}) => (
            <CustomIcon 
                name='video-camera' 
                size={25} 
                color={focused?selectedColor:COLORS.primaryWhiteHex} 
            />
        )
    }}></Tab.Screen>
    <Tab.Screen name='Profile' component={ProfileScreen} options={{
        tabBarIcon: ({focused}) => (
            <CustomIcon 
                name='user' 
                size={25} 
                color={focused?selectedColor:COLORS.primaryWhiteHex} 
            />
        )
    }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 70,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
    }
})