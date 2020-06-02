import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    Button,
    ScrollView,
    Dimensions,
    FlatList,
    Alert,
    StatusBar,
    TouchableHighlight,
    Image,
    ActivityIndicator,
} from 'react-native'
import productData from '../product.json'

const circleSize = 8
const circleMargin = 5

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
            ads: [
                {
                    url:
                        'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg',
                },
                {
                    url:
                        'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg',
                },
                {
                    url:
                        'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg',
                },
            ],
            searchText: '',
            products: [],
            isRefreshing: false, // 是否正在刷新
        }
    }

    componentDidMount() {
        this._startTimer()
        this.setState({products: productData.list})
    }

    componentWillUnmount() {
        clearInterval(this.swiperInterval)
    }

    _startTimer = () => {
        this.swiperInterval = setInterval(() => {
            let nextPage = this.state.currentPage + 1
            if (nextPage >= 3) {
                nextPage = 0
            }
            this.setState({currentPage: nextPage})
            const offsetX = Dimensions.get('window').width * nextPage
            this.refs.scrollView.scrollResponderScrollTo({
                x: offsetX,
                y: 0,
                animated: true,
            })
        }, 2000)
    }

    loadProductData = () => {
        !this.state.isRefreshing && this.setState({
            isRefreshing: true,
        })
        setTimeout(() => {
            this.setState({
                products: productData.list,
                isRefreshing: false,
            })
        }, 2000)
    }

    navigateToDetail = (item) => {
        this.props.navigation.navigate('Details', {...item})
        // this.props.navigation.jumpTo('Details', {...item})
    }

    _renderProductItem = (item) => {
        return (
            <TouchableHighlight underlayColor='white' onPress={() => this.navigateToDetail(item)}>
                <View style={styles.productItem}>
                    <Image style={styles.productItemImg} source={{uri: item.image_url}}/>
                    <View style={styles.productItemRight}>
                        <Text style={styles.productItemName}>{item.name}</Text>
                        <Text style={styles.productItemPrice}>{item.price}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    handleLoadMore = () => {
        // setTimeout(() => {
        //     this.setState({
        //         products: this.state.products.concat(productData.list)
        //     })
        // }, 2000)
    }

    genIndicator = () => {
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.loadMoreTip}
                size='large'
                animating={true}
            />
            <Text>正在加载更多</Text>
        </View>
    }

    render() {
        const {ads, searchText, products, currentPage, isRefreshing} = this.state
        const adsCount = ads.length
        const indicatorsWidth = circleSize * adsCount + circleMargin * adsCount * 2
        const indicatorsLeft =
            (Dimensions.get('window').width - indicatorsWidth) / 2

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="blue" barStyle="default"/>
                {/* 搜索栏 */}
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="搜索商品"
                        style={styles.input}
                        onChangeText={(text) => {
                            this.setState({searchText: text})
                            console.log('你输入的内容:', searchText)
                        }}
                    />
                    <Button
                        style={styles.searchBtn}
                        title="搜索"
                        onPress={() => Alert.alert('搜索内容' + searchText)}></Button>
                </View>
                {/* 广告轮播图 */}
                <View style={styles.advertisement}>
                    <ScrollView
                        ref="scrollView"
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}>
                        {ads.map((item, index) => {
                            return (
                                <TouchableHighlight
                                    key={index}
                                    onPress={() => Alert.alert('click swiper')}>
                                    <Image
                                        style={styles.advertisementContent}
                                        source={{uri: item.url}}
                                    />
                                </TouchableHighlight>
                            )
                        })}
                    </ScrollView>
                    <View style={[styles.indicator, {left: indicatorsLeft}]}>
                        {ads.map((ad, index) => {
                            return (
                                <View
                                    key={index}
                                    style={
                                        index === currentPage
                                            ? styles.circleSelected
                                            : styles.circle
                                    }></View>
                            )
                        })}
                    </View>
                </View>
                {/* 商品列表 */}
                <View style={styles.products}>
                    {/* {isRefreshing && <ActivityIndicator size="large" color="#0000ff" />} */}
                    <FlatList
                        data={products}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({item}) => this._renderProductItem(item)}
                        refreshing={isRefreshing}
                        onRefresh={() => this.loadProductData()}
                        ListFooterComponent={() => this.genIndicator()}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        // marginTop: Platform.OS === 'ios' ? 40 : 0,
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'gray',
    },
    searchBtn: {
        flex: 1,
    },
    advertisement: {
        height: 180,
        position: 'relative',
    },
    advertisementContent: {
        width: Dimensions.get('window').width,
        height: 180,
    },
    indicator: {
        position: 'absolute',
        top: 160,
        flexDirection: 'row',
    },
    circleSelected: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: '#fff',
        marginHorizontal: circleMargin,
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: '#DDD',
        marginHorizontal: circleMargin,
    },
    products: {
        flex: 1,
    },
    productItem: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    productItemImg: {
        width: 60,
        height: 60,
        marginRight: 8
    },
    productItemRight: {
        flexDirection: 'column'
    },
    productItemName: {
        color: '#666',
        fontSize: 24
    },
    productItemPrice: {
        color: '#999',
        fontSize: 22,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    loadMoreTip: {
        color: '#ddd',
        margin: 10
    }
})
