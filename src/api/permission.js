import request from '@/utils/request'

export function userList(query) {
  return request({
    url: '/permission/userList',
    method: 'get',
    params: query
  })
}

export function userPv(id) {
  return request({
    url: '/permission/userPv',
    method: 'get',
    params: { id }
  })
}

export function createUser(data) {
  return request({
    url: '/permission/createUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/permission/updateUser',
    method: 'post',
    data
  })
}
