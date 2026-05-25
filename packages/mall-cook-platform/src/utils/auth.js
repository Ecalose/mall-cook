/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-03-25 10:25:23
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-15 17:17:02
 */
const TokenKey = 'token'
const UserInfoKey = 'user-info'
const ProjectKey = 'mall-project'

function parseStorageItem(value) {
    if (!value) {
        return null
    }

    try {
        return JSON.parse(value)
    } catch (error) {
        console.warn('瀛樺偍鏁版嵁瑙ｆ瀽澶辫触', error)
        return null
    }
}

export function getAuthToken() {
    return sessionStorage.getItem(TokenKey)
}

export function setAuthToken(token) {
    return sessionStorage.setItem(TokenKey, token)
}

export function removeAuthToken() {
    return sessionStorage.removeItem(TokenKey)
}

export function setAuthUserInfo(userInfo) {
    return sessionStorage.setItem(UserInfoKey, JSON.stringify(userInfo))
}

export function getAuthUserInfo() {
    let userInfoStr = sessionStorage.getItem(UserInfoKey)
    return parseStorageItem(userInfoStr)
}

export function removeAuthUserInfo() {
    return sessionStorage.removeItem(UserInfoKey)
}

export function getProject() {
    let str = localStorage.getItem(ProjectKey)
    return parseStorageItem(str)
}

export function settingProject(project) {
    return localStorage.setItem(ProjectKey, JSON.stringify(project))
}

export function removeProject() {
    return localStorage.removeItem(ProjectKey)
}
