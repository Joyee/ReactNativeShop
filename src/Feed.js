import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Request from './utils/fetch'
import FeedList from './components/FeedList'
import ScrollTopTab from './components/ScrollTopTab'

const MaterialTopTabs = createMaterialTopTabNavigator()

export default class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            squareList: [], // 广场列表
        }
    }

    componentDidMount() {
        this.loadSquareList()
    }

    loadSquareList = () => {
        Request.get(`Video/square`).then(result => {
            console.log('square:', result)
            this.setState({
                squareList: result
            })
        })
    }

    render() {
        const { squareList } = this.state
        // return (
        //     squareList.length
        //         ? <MaterialTopTabs.Navigator
        //             tabBarOptions={{
        //             activeTintColor: '#ffffff',
        //             labelStyle: { fontSize: 16 },
        //             style: styles.topNav,
        //         }}>
        //         {
        //             squareList.map((item) => {
        //                 return (
        //                     <MaterialTopTabs.Screen
        //                         key={item.square_id}
        //                         name={item.square_name}
        //                         component={FeedList}
        //                         options={{ title: item.square_name }}
        //                     />
        //                 )
        //             })
        //         }
        //     </MaterialTopTabs.Navigator> : null
        // )
        return (<ScrollTopTab/>)
    }
}

const styles = StyleSheet.create({
    topNav: {
        // width: '100%',
        height: 128,
        backgroundColor: '#FF7C3E',
        display: 'flex',
        // alignItems: 'center',
    },
    navItem: {
        color: '#FCB4C1',
        fontSize: 32,
    }
})