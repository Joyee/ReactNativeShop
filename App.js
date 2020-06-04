import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// import HomeScreen from './src/home'
import ProfileScreen from './src/profile'
import ScrollTopTab from './src/ScrollTopTab'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function HomeScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='ScrollTopBar' component={ScrollTopTab} />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Home'>
                <Drawer.Screen name='Home' component={HomeScreen}/>
                <Drawer.Screen name='Profile' component={ProfileScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}