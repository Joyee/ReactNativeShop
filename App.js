import React, {Component} from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Home from './src/home'
import Details from './src/detail'
import More from './src/more'
import Profile from "./src/profile"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeScreen() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel: '首页',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name='home' color={color} size={size}/>
                    )
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name='account' color={color} size={size}/>
                    ),
                }}/>
            <Tab.Screen
                name='More'
                component={More}
                options={{
                    tabBarLabel: '更多',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name='dots-horizontal-circle-outline' color={color} size={size}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name='Home'
                        component={HomeScreen}
                        // options={{ title: 'home' }}
                    />

                    <Stack.Screen
                        name='Details'
                        component={Details}
                        options={{title: 'details'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}