import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

export default class ScrollTopTab extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return <View style={styles.tabs}>
            {this.props.tabs && this.props.tabs.map((tab, i) => {
                return <TouchableOpacity
                    key={tab}
                    onPress={() => this.props.goToPage(tab.square_id)} style={styles.tab}
                >
                    {tab.square_name}
                </TouchableOpacity>
            })}
        </View>
    }
}

const styles = StyleSheet.create({
    tabs: {
        height: 108,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab: {
        height: 45,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    }
})