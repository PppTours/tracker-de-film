import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from './src/navigators/TabNavigator'
import { StyleSheet } from "react-native";
import InfoScreen from "./src/screens/InfoScreen";
import { COLORS } from "./src/theme/theme";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ 
        contentStyle: {backgroundColor: COLORS.backgroundColor},
        headerShown: false, 
      }}>
        <Stack.Screen
          name="Tab"
          component={ TabNavigator }
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen
          name="Info"
          component={ InfoScreen }
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
