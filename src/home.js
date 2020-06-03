import React from 'react'
import { View, Button, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

function FollowScreen() {
    return (<Text>关注</Text>)
}

function FindScreen() {
    return <Text>find</Text>
}

function Tabs() {
    return (
        <Tab.Navigator style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 400, background: 'blue' }}>
            <Tab.Screen name='Follow' component={FollowScreen}/>
            <Tab.Screen name='Find' component={FindScreen}/>
        </Tab.Navigator>
    )
}

export default function HomeScreen({ navigation }) {
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title='open drawer' onPress={() => navigation.openDrawer()}></Button>
    </View>)
}