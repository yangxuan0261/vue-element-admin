import protoRoot from '@/proto/proto'
import protobuf from 'protobufjs'

import axios from 'axios'
const httpService = axios.create({
    timeout: 45000,
    method: 'post',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/octet-stream'
    },
    responseType: 'arraybuffer'
})

// 请求体message
const PBMessageRequest = protoRoot.lookup('goprotobuf.PBMessageRequest')
// 响应体的message
const PBMessageResponse = protoRoot.lookup('goprotobuf.PBMessageResponse')

const apiVersion = '1.0.0'
const token = 'my_token'

function getMessageTypeValue(msgType) {
    const PBMessageType = protoRoot.lookup('goprotobuf.PBMessageType')
    const ret = PBMessageType.values[msgType]
    return ret
}

/**
 * @param {*} msgType 接口名称
 * @param {*} requestBody 请求体参数
 * @param {*} responseType 返回值
 */
function request(msgType, requestBody, responseType) {
    // 得到api的枚举值
    const _msgType = getMessageTypeValue(msgType)

    // 请求需要的数据
    const reqData = {
        timeStamp: new Date().getTime(),
        type: _msgType,
        version: apiVersion,
        messageData: requestBody,
        token: token
    }
    // 将对象序列化成请求体实例
    const req = PBMessageRequest.create(reqData)

    // 调用axios发起请求
    // 这里用到axios的配置项：transformRequest和transformResponse
    // transformRequest 发起请求时，调用transformRequest方法，目的是将req转换成二进制
    // transformResponse 对返回的数据进行处理，目的是将二进制转换成真正的json数据
    return httpService.post('/hello', req, {
        transformRequest,
        transformResponse: transformResponseFactory(responseType)
    }).then(({ data, status }) => {
        // 对请求做处理
        if (status !== 200) {
            const err = new Error('服务器异常')
            throw err
        } else {
            console.log("--- aaa");
            console.log(data)
        }
        return data.messageData
    }, (err) => {
        throw err
    })
}

// 将请求数据encode成二进制，encode是proto.js提供的方法
function transformRequest(data) {
    return PBMessageRequest.encode(data).finish()
}

function isArrayBuffer(obj) {
    return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

function transformResponseFactory(responseType) {
    return function transformResponse(rawResponse) {
        // 判断response是否是arrayBuffer
        if (rawResponse == null || !isArrayBuffer(rawResponse)) {
            return rawResponse
        }
        try {
            const buf = protobuf.util.newBuffer(rawResponse)
            // decode响应体
            const decodedResponse = PBMessageResponse.decode(buf)
            if (decodedResponse.messageData && responseType) {
                const model = protoRoot.lookup(responseType)
                decodedResponse.messageData = model.decode(decodedResponse.messageData)
            }
            return decodedResponse
        } catch (err) {
            return err
        }
    }
}

// 在request下添加一个方法，方便用于处理请求参数
request.create = function(protoName, obj) {
    const pbConstruct = protoRoot.lookup(protoName)
    return pbConstruct.encode(obj).finish()
}

// 将模块暴露出去
export default request
