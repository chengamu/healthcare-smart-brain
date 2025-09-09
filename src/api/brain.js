import request from '@/utils/request'
import qs from "qs";

// 查询资金类型列表（所有）
export function listFundTypeAll(query) {
    return request({
        url: '/healthbrain/fundType/alllist',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询资金数据列表（所有）
export function listFundDataAll(query) {
    return request({
        url: '/healthbrain/fundData/alllist',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询里程碑列表（所有）
export function listEventAll(query) {
    return request({
        url: '/healthbrain/milestone/alllist',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询企业列表（所有）
export function listEnterpriseAll(query) {
    return request({
        url: '/healthbrain/enterprise/alllist',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 按企业类型统计
export function countEnterpriseByType(query) {
    return request({
        url: '/healthbrain/enterprise/countByType',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 按企业发展方向统计
export function countEnterpriseByDevelopment(query) {
    return request({
        url: '/healthbrain/enterprise/countByDevelopment',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 按政策类型统计
export function countPolicyByType(query) {
    return request({
        url: '/healthbrain/policy/countByType',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询平台列表（所有）
export function listPlatformAll(query) {
    return request({
        url: '/healthbrain/platform/alllist',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询医疗器械列表（所有）
export function listInstrumentAll(query) {
    return request({
        url: '/healthbrain/instrument/alllist',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询技术列表（所有）
export function listTechnologyAll(query) {
    return request({
        url: '/healthbrain/technology/alllist',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 按创新药所处阶段统计
export function countDrugByPhase(query) {
    return request({
        url: '/healthbrain/drug/countByPhase',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询人才列表（所有）
export function listTalentAll(query) {
    return request({
        url: '/healthbrain/talent/alllist',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询共享设备列表（所有）
export function listEquipmentAll(query) {
    return request({
        url: '/healthbrain/equipment/alllist',
        method: 'get',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}