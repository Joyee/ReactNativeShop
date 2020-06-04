import md5 from 'react-native-md5'
const BASE_URL = 'https://api.tapai.net.cn/V1'
const signKey = 'Gg=z?p!6bqu^#xk$:4L1sA~Vd7)Za_iw/PeYM}]T'

function getSign(url, timerString) {
    const sign = url + '#' + timerString + '#' + signKey
    console.log('===sign==', md5.hex_md5(sign))
    return md5.hex_md5(sign)
}

function timestamp() {
    const d = new Date()
    const localTime = d.getTime()
    const localOffset = d.getTimezoneOffset()
    const utc = localTime + localOffset
    const offset = 8
    return utc + (3600000 * offset)
}

function getHeader(url, args = {}) {
    const time = timestamp()
    const header = {
        'x-access-sign': getSign(url, time),
        'x-access-time': time,
        'x-access-token': '',
        'x-device-id': 'A65069FB-C9EE-46CF-A7ED-69FE74125651',
        'user-agent': '',
        'x-app-version': '',
        'x-sensor-id': '',
        'x-net-use': 'wifi'
    }
    return Object.assign({}, header, args)
}

export default class Request {
    static get = (url) => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL}/${url}`, {
                method: 'GET',
                headers: getHeader(url)
            }).then((response) => response.json())
                .then(result => {
                    resolve(result)
                }).catch(error => {
                reject(error)
            })
        })
    }
}