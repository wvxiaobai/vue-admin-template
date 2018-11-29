import request from '@/utils/request'

export function userList(query) {
  return request({
    url: '/permission/userList',
    method: 'get',
    params: query
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

export function deleteUser(data) {
  return request({
    url: '/permission/deleteUser',
    method: 'post',
    data
  })
}

export function roleList(query) {
  return request({
    url: '/permission/roleList',
    method: 'get',
    params: query
  })
}

export function createRole(data) {
  return request({
    url: '/permission/createRole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/permission/updateRole',
    method: 'post',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: '/permission/deleteRole',
    method: 'post',
    data
  })
}