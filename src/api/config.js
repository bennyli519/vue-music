/*
 * @Author: jerryLi 
 * @Date: 2017-12-27 23:11:29 
 * @Last Modified by: jerryLi
 * @Last Modified time: 2017-12-27 23:13:57
 * 
 * 配置JSONP请求参数
 */

export const commonParams = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}

export const options = {
    param: 'jsonpCallback'
}

export const ERR_OK = 0