<template>
    <div class="right-card">
        <m-card title="人才就业政策">
            <div class="talent-employment-policy-container">
                <table class="policy-table">
                    <thead>
                        <tr>
                            <th>人才类别</th>
                            <th v-for="(item, index) in dataRcjybtbz" :key="index">{{ item.category }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>房票补贴</td>
                            <td v-for="(item, index) in dataRcjybtbz" :key="index">{{ item.fpbt }}</td>
                        </tr>
                        <tr>
                            <td>安家补贴</td>
                            <td v-for="(item, index) in dataRcjybtbz" :key="index">{{ item.ajbt }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="jtsjzc-section">
                    <div class="policy-list">
                        <div v-for="(item, index) in dataJtsjzc" :key="index" class="policy-item">
                            <div class="policy-name">{{ item.name }}</div>
                            <div class="policy-desc">
                                {{ item.desc }}
                            </div>
                            <div class="policy-value">
                                {{ item.value }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import mCard from "@/components/mCard/index.vue"
import { useGetConfigKey } from '@/hooks/useGetConfigKey'

const {
    configValue: rcjybtbz,
    getConfigKeyFunc: fetchRcjybtbz
} = useGetConfigKey('brain.talentEngine.rcjyzc.rcjybtbz')

const {
    configValue: jtsjzc,
    getConfigKeyFunc: fetchJtsjzc
} = useGetConfigKey('brain.talentEngine.rcjyzc.jtsjzc')

const dataRcjybtbz = ref([])
const dataJtsjzc = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchRcjybtbz(),
        fetchJtsjzc(),
    ])

    try {
        const parsedData = JSON.parse(rcjybtbz.value)
        dataRcjybtbz.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        dataRcjybtbz.value = [
            {
                category: "博士",
                fpbt: '50万元',
                ajbt: '18万元',
            },
            {
                category: "硕士",
                fpbt: '25万元',
                ajbt: '9万元',
            },
            {
                category: "“双一流”本科",
                fpbt: '15万元',
                ajbt: '7.5万元',
            },
            {
                category: "其他全日制本科",
                fpbt: '10万元',
                ajbt: '3万元',
            },
            {
                category: "专科 高职",
                fpbt: '5万元',
                ajbt: '1.8万元',
            },
        ]
    }

    try {
        const parsedData = JSON.parse(jtsjzc.value)
        dataJtsjzc.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        dataJtsjzc.value = [
            {
                name: "双博士夫妻",
                desc: '房票补贴升级至',
                value: "150万元",
            },
            {
                name: "博士+硕士夫妻",
                desc: '房票补贴升级至',
                value: "90万元",
            },
            {
                name: "高层次人才子女国内就读国际学校",
                desc: '补贴学费',
                value: "50%(为期三年)",
            },
        ]
    }
}
</script>

<style scoped lang="scss">
.talent-employment-policy-container {
    width: 100%;
    height: 100%;
    padding: 16px;
    overflow: auto;
    background:
        radial-gradient(ellipse at 20% 20%, rgba(48, 220, 255, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(0, 255, 136, 0.03) 0%, transparent 50%);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.policy-table {
    width: 100%;
    border-collapse: collapse;
    color: #fff;
    font-size: 12px;
    
    th, td {
        padding: 10px 4px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    th {
        background-color: rgba(0, 136, 255, 0.2);
        font-weight: normal;
        color: #fff;
    }
    
    td:first-child {
        background-color: rgba(0, 136, 255, 0.1);
        font-weight: normal;
        color: #fff;
    }
    
    tr:hover td {
        background-color: rgba(64, 158, 255, 0.1);
    }
}

/* 添加新样式来满足具体需求 */
.policy-table thead tr th:not(:first-child) {
    font-weight: bold;
    color: #409eff;
}

.policy-table tbody tr:nth-child(1) td:not(:first-child) {
    font-weight: bold;
    color: #00FF88;
}

.policy-table tbody tr:nth-child(2) td:not(:first-child) {
    font-weight: bold;
    color: #00FF88;
}

.jtsjzc-section {

    h3 {
        color: #409eff;
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: 600;
    }

    .policy-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 12px;

        .policy-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 4px;
            background: rgba(0, 136, 255, 0.1);
            border-radius: 4px;
            border: 1px solid rgba(64, 158, 255, 0.2);
            gap: 4px;

            .policy-name {
                color: #409eff;
                font-weight: 500;
                margin-bottom: 6px;
                height: 28px;
            }

            .policy-desc {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #fff;
            }

            .policy-value {
                font-weight: 600;
                color: #00FF88;
                margin-left: auto;
            }
        }
    }
}
</style>