import React from 'react'
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const MaterialTopTabs = createMaterialTopTabNavigator()

function Chat() {
    return <Text>chat</Text>
}

function Contacts() {
    return <Text>Contacts</Text>
}

function Albums() {
    return <Text>Albums</Text>
}

export default function Feed() {
    return (
        <MaterialTopTabs.Navigator>
            <MaterialTopTabs.Screen
                name="Chat"
                component={Chat}
                options={{ title: 'Chat' }}
            />
            <MaterialTopTabs.Screen
                name="Contacts"
                component={Contacts}
                options={{ title: 'Contacts' }}
            />
            <MaterialTopTabs.Screen
                name="Albums"
                component={Albums}
                options={{ title: 'Albums' }}
            />
        </MaterialTopTabs.Navigator>
    )
}