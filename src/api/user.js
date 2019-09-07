import request from '@/utils/request'
import requestExt from '@/utils/requestExt'

export function login(data) {
    console.log("--- login")
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export function getStudentList(params) {
    console.log("--- getStudentList");
    const req = requestExt.create('goprotobuf.PBStudentListReq', params)
    return requestExt('getStudentList', req, 'goprotobuf.PBStudentListRsp')
}

export function testpb() {
    const req = {
        limit: 20,
        offset: 2
    }

    getStudentList(req).then((res) => {
        console.log("--- res:", res)
      }).catch((res) => {
        console.error(res)
      })
    // console.log("--- testpb")
    // return request({
    //     url: '/hello',
    //     method: 'post'
    // })
}

