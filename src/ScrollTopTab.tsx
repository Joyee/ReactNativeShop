import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
    TabView,
    TabBar,
    SceneMap,
    NavigationState,
    SceneRendererProps,
} from 'react-native-tab-view'
import LinearGradient from 'react-native-linear-gradient'
import Request from './utils/fetch'
import FeedList from './components/FeedList'
import Feed from './Feed'

type State = NavigationState<{
    key: string;
    title: string;
}>;

export default class ScrollTopTab extends React.Component<{},
    State> {
    state = {
        index: 1,
        routes: [
            // { key: 'article', title: 'Article' },
            // { key: 'contacts', title: 'Contacts' },
            // { key: 'albums', title: 'Albums' },
            // { key: 'chat', title: 'Chat' },
        ],
        scenes: {},
        // squareList: [],
    }

    componentDidMount() {
        this.loadSquareList()
    }

    loadSquareList = () => {
        Request.get(`Video/square`).then(result => {
            console.log('square:', result)
            let scenes: any = {}
            result.forEach((item: any) => {
                scenes[item.square_name] = FeedList
                this.setState({
                    routes: [{key: item.square_id, title: item.square_name}, ...this.state.routes],
                    scenes: FeedList,
                })
            })
        })
    }

    private handleIndexChange = (index: number) => {
        this.setState({ index })
    }

    private renderTabBar = (
        props: SceneRendererProps & { navigationState: State }
    ) => (
        <LinearGradient
            colors={['rgba(255,55,118,1)', 'rgba(255,124,62,1)']}
            style={styles.gradient}
        >
            <TabBar
                {...props}
                scrollEnabled
                indicatorStyle={styles.indicator}
                style={styles.tabbar}
                tabStyle={styles.tab}
                labelStyle={styles.label}
            />
        </LinearGradient>
    )

    private renderScene = SceneMap({
        albums: FeedList,
        contacts: FeedList,
        article: Article,
        chat: Chat,
    })

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
                onIndexChange={this.handleIndexChange}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        // flex: 1,
    },
    tabbar: {
        // flex: 1,
        paddingTop: 20,
        height: 88,
        backgroundColor: 'transparent'
        // backgroundColor: '#FF3776',
    },
    tab: {
        width: 120,
        height: 88,
        color: 'rgba(255, 255, 255, .4)',
        fontSize: 36,
        paddingLeft: 20,
        paddingRight: 20,
    },
    indicator: {
        // backgroundColor: '#ffeb3b',
    },
    label: {
        fontWeight: '400',
    },
})