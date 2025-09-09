<script setup>
import {onMounted, ref} from "vue"
import mCard from "@/components/mCard/index.vue"
import {listEnterpriseAll, listTechnologyAll} from "@/api/brain.js";
import {listDictData} from "@/api/system.js";

const emit = defineEmits(['update:technologyData'])

const technologyList = ref([])
const enterpriseList = ref([])
const dictList = ref([{
    name: 'brain_technology_label', data: []
}, {
    name: 'brain_technology_deadline', data: []
}])
const brain_technology_label = ref([])
const brain_technology_deadline = ref([])

onMounted(() => {
    init()
})

async function init() {
    await getListEnterpriseAll()
    await getListDictData('brain_technology_label', 0)
    await getListDictData('brain_technology_deadline', 1)
    await getListTechnologyAll()
}

const getListDictData = async (dictName, index) => {
    try {
        const response = await listDictData(dictName)
        let data = response.data.map((item, index) => {
            return {
                label: item.dictLabel,
                value: item.dictValue
            }
        });
        dictList.value[index].data = data
    } catch (error) {
        console.error('获取企业类别数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
};

async function getListEnterpriseAll() {
    try {
        const response = await listEnterpriseAll()
        enterpriseList.value = response
    } catch (error) {
        console.error('获取企业列表数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

async function getListTechnologyAll() {
    try {
        const response = await listTechnologyAll()
        technologyList.value = response.map(item => {
            return {
                ...item,
                labelName: dictList.value[0].data.find(label => label.value === item.label)?.label,
                deadlineName: dictList.value[1].data.find(deadline => deadline.value === item.deadline)?.label,
                enterpriseName: enterpriseList.value.find(enterprise => enterprise.id === item.enterpriseId)?.name,
            }
        })
        emit('update:technologyData', response.length)
    } catch (error) {
        console.error('获取技术数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

// 控制弹窗显示的状态
const showDialog = ref(false)
// 当前选中的技术信息
const selectedTechnology = ref(null)

// 处理点击事件，显示弹窗
const handleGroupClick = (group) => {
    selectedTechnology.value = group
    showDialog.value = true
}

// 关闭弹窗
const closeDialog = () => {
    showDialog.value = false
    selectedTechnology.value = null
}
</script>

<template>
    <div class="left-card">
        <m-card title="技术合作">
            <div class="key-technology-container" v-auto-scroll>
                <div class="image-group">
                    <div class="image-list">
                        <div
                            v-for="(item, index) in technologyList"
                            :key="index"
                            class="image-item"
                            @click="handleGroupClick(item)"
                        >
                            <div class="image-info">
                                <div class="image-name">{{ item.title }}</div>
                                <div class="image-description" v-if="item.enterpriseName">
                                    发布单位：{{ item.enterpriseName }}
                                </div>
                                <div class="image-meta">
                                    <span class="deadline" v-if="item.deadlineName">
                                        发布有效期: {{ item.deadlineName }}
                                    </span>
                                    <span class="custom-label" v-if="item.labelName">
                                        {{ item.labelName }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>

    <!-- 弹窗 -->
    <Teleport to="body">
        <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
            <div class="dialog-content" @click.stop>
                <m-card :title="selectedTechnology?.name" width="800" height="650">
                    <div class="technology-detail">
                        <div class="technology-info">
                            <div class="info-item">
                                <label>技&emsp13;术&emsp13;名&emsp13;称：</label>
                                <span>{{ selectedTechnology?.title }}</span>
                            </div>
                            <div class="info-item">
                                <label>标&emsp;&emsp;&emsp;签：</label>
                                <span>{{ selectedTechnology?.labelName }}</span>
                            </div>
                            <div class="info-item">
                                <label>自定义标签：</label>
                                <span>{{ selectedTechnology?.customLabel }}</span>
                            </div>
                            <div class="info-item">
                                <label>发&emsp13;布&emsp13;单&emsp13;位：</label>
                                <span>{{ selectedTechnology?.enterpriseName }}</span>
                            </div>
                            <div class="info-item">
                                <label>发布有效期：</label>
                                <span>{{ selectedTechnology?.deadlineName }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="technology-detail">
                        <div class="technology-info">
                            <div class="info-item" v-if="selectedTechnology?.description">
                                <label>详&emsp13;细&emsp13;描&emsp13;述：</label>
                                <span class="intro-text">{{ selectedTechnology?.description }}</span>
                            </div>
                        </div>
                    </div>
                </m-card>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.key-technology-container {
    height: 100%;
    padding: 8px 20px;
    color: white;
    box-sizing: border-box;
    overflow-y: auto;

    h2 {
        text-align: center;
        margin-bottom: 30px;
        font-size: 24px;
    }

    .image-group {


        .industry {
            margin: 4px 0 ;
            flex-shrink: 0;
            color: #fff;
            font-size: 20px;
            line-height: 32px;
            font-family: "PingFangSc";
            font-weight: 600;
            background: -webkit-linear-gradient(rgba(219, 249, 255, 1), rgba(169, 240, 255, 1));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .image-list {
            display: grid;
            grid-template-columns: repeat(1, 1fr); // 改为单列布局
            gap: 16px;

            .image-item {
                position: relative;
                display: flex;
                align-items: center;
                //background: #ffffff;
                border-radius: 4px;
                overflow: hidden;
                width: 100%; // 确保宽度为100%
                cursor: pointer;
                padding: 12px;
                border: 1px solid transparent;
                transition: all 0.3s ease;
                box-sizing: border-box;

                &:hover {
                    background-color: rgba(64, 158, 255, 0.1);
                    border-color: rgba(64, 158, 255, 0.5);
                    border-radius: 4px;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                img {
                    width: 60px; // 固定图片宽度
                    height: 60px;
                    object-fit: contain;
                    border-radius: 16px;
                    border: 1px solid #666;
                    margin: 0 10px 0 0;
                    background: #ffffff;
                }

                .image-info {
                    flex: 1; // 占据剩余空间
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 4px 0;
                    min-width: 0; // 允许文本截断

                    .image-name {
                        color: #ffffff;
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 4px;
                        transform: none; // 移除悬停效果
                        background: none;
                        padding: 0;
                        text-align: left;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .image-development {
                        color: #D3F8F2;
                        font-size: 13px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-bottom: 4px;
                    }
                    
                    .image-description {
                        color: #a0d3ff;
                        font-size: 12px;
                        margin-bottom: 6px;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    
                    .image-meta {
                        display: flex;
                        justify-content: space-between;
                        
                        .deadline, .custom-label {
                            color: #ffd700;
                            font-size: 11px;
                            border-radius: 4px;
                        }
                    }
                }
            }
        }
    }
}

.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.dialog-content {
    border-radius: 8px;
    width: 80%;
    max-width: 800px;
    max-height: 80%;
    overflow: hidden;
}

.technology-detail {
    display: flex;
    padding: 20px 20px 0 20px;
    color: white;

    .technology-info {
        flex: 1;
        padding-right: 20px;
        display: flex;
        flex-direction: column;

        .info-item {
            margin: auto 0;

            label {
                flex-shrink: 0;
                color: #fff;
                font-size: 16px;
                line-height: 20px;
                font-family: "PingFangSc";
                font-weight: 600;
                background: -webkit-linear-gradient(rgba(219, 249, 255, 1), rgba(169, 240, 255, 1));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            span {
                color: #ffffff;
            }

            .intro-text {
                display: block;
                white-space: pre-wrap;
                line-height: 1.5;
                margin: 8px 0;
            }
        }
    }

    .technology-image {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;

        img {
            max-width: 100%;
            max-height: 100px;
            border-radius: 4px;
            border: 1px solid #666;
            background: #ffffff;
        }
    }
}

@media (max-width: 768px) {
    .technology-detail {
        flex-direction: column;

        .technology-info {
            padding-right: 0;
            margin-bottom: 20px;
        }

        .technology-image {
            width: 100%;
        }
    }
}
</style>