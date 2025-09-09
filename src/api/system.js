import request from '@/utils/request'
import qs from "qs";

// 查询资金类型列表（所有）
export function listDictData(dictType) {
    return request({
        url: '/system/dict/data/type/' + dictType,
        method: 'get',
    })
}