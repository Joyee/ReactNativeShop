import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      id: null,
      price: 0,
    }
  }
  componentDidMount() {
    console.log(this.props.route)
    this.setState({
      ...this.props.route.params
    })
  }
  render() {
    const { name, price } = this.state
    return (
      <View>
        <Text>商品名称: {name}</Text>
        <Text>价格: ¥{price}</Text>
      </View>
    )
  }
}