import React from 'react'
import {
    Text,
    TouchableHighlight,
} from 'react-native'

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import LinearGradient from 'react-native-linear-gradient'
// import createReactClass from 'create-react-class'
import Request from './utils/fetch'
import ScrollTopTab from './components/ScrollTopTab'

export default class ScrollView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 1,
            routes: [],
        }
    }

    componentDidMount() {
        this.loadSquareList()
    }

    loadSquareList = () => {
        Request.get(`Video/square`).then(result => {
            // let scenes = []
            let scenesMap = {}
            result.forEach((item) => {
                // scenesMap[item.square_name] = FeedList
                this.setState({
                    routes: [item, ...this.state.routes],
                })
            })
            // this.scenesMap = scenesMap
        })
    }

    render() {
        return <ScrollableTabView
            style={{ marginTop: 20 }}
            initialPage={1}
            renderTabBar={() => <ScrollTopTab tabs={this.state.routes} />}
        >
            {this.state.routes.map((tab, i) => {
                return <Text
                    tabLabel={tab.square_name}
                    key={tab.square_id}
                >
                    {tab.square_name} page
                </Text>
            })}
        </ScrollableTabView>
    }
}