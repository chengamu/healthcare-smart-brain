<script setup>
import { ref, onMounted } from "vue";
import mCard from "@/components/mCard/index.vue"
import avatar from "@/assets/images/talentEngine/avatar.png"
import { useGetConfigKey } from '@/hooks/useGetConfigKey'

const props = defineProps({
    title: {
        type: String,
        default: '党员先锋岗'
    },
    height: {
        type: Number,
        default: 838
    }
})

const { 
    configValue: dyxfg,
    getConfigKeyFunc: fetchDyxfg 
} = useGetConfigKey('brain.redCoreLeadership.dyxfg')

const keyPartyMember = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchDyxfg(),
    ])
    
    try {
        const parsedData = JSON.parse(dyxfg.value)
        keyPartyMember.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        keyPartyMember.value = [
            { src: '', name: '党员XXX', deed: '带领团队成功研发新型抗癌药物，填补国内技术空白，为患者带来新希望。该药物已进入临床试验阶段，预计年产值可达2亿元。' },
            { src: '', name: '党员XXX', deed: '主导开发智能诊断设备，突破国外技术封锁，产品已在国内500多家医院应用，累计服务患者超过100万人次，创造经济效益1.5亿元。' },
            { src: '', name: '党员XXX', deed: '创新推出 家庭医生+互联网 服务模式，为辖区3万居民提供精准健康管理服务，使慢性病控制率提升35%，获得国家级社区卫生服务示范项目称号。' },
            { src: '', name: '党员XXX', deed: '牵头建立新药研发中心，培养专业技术人才80余名，成功申报发明专利15项，推动企业转型升级，年产值增长40%。' },
            { src: '', name: '党员XXX', deed: '在新冠疫情防控中表现突出，建立高效检测体系，日检测能力达5万份，为区域疫情防控做出重要贡献，获得省级抗疫先进个人称号。' },
            { src: '', name: '党员XXX', deed: '推动建立产学研一体化平台，引进高层次人才团队12个，孵化科技型企业30余家，园区年产值突破50亿元，成为区域经济发展新引擎。' },
        ]
    }
}
</script>

<template>
    <div class="right-card">
        <m-card title="党员先锋岗" :height="height">
            <div class="key-talent-container" v-auto-scroll>
                <div class="image-list">
                    <div
                        v-for="image in keyPartyMember"
                        :key="image.name"
                        class="image-item"
                    >
                        <div class="image-wrapper">
                            <img :src="image.src || avatar" :alt="image.name" />
                            <div class="image-overlay"></div>
                        </div>
                        <div class="image-info">
                            <div class="image-name">{{ image.name }}</div>
                            <div class="image-development">{{ image.deed }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>

</template>

<style scoped lang="scss">
.key-talent-container {
    height: 100%;
    padding: 20px;
    color: white;
    box-sizing: border-box;
    overflow-y: auto;
    background: transparent;
    border-radius: 12px;
    position: relative;
    box-sizing: border-box;
    
    .image-list {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 18px;

        .image-item {
            position: relative;
            display: flex;
            align-items: center;
            border-radius: 12px;
            overflow: hidden;
            width: 100%;
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 15px;
            box-sizing: border-box;
            
            &::before {
                content: '🚩';
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 16px;
                animation: wave 2s infinite;
            }
            
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                animation: slide 4s infinite;
            }
            
            &:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 12px 30px rgba(220, 38, 38, 0.4);
                border-color: rgba(239, 68, 68, 0.8);
            }
            
            &:nth-child(odd) {
                border-left: 4px solid #fbbf24;
            }
            
            &:nth-child(even) {
                border-left: 4px solid #34d399;
            }

            .image-wrapper {
                position: relative;
                width: 70px;
                height: 90px;
                margin: 0 15px 0 0;
                border-radius: 8px;
                overflow: hidden;
                border: 2px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 6px;
                    transition: transform 0.3s ease;
                }
                
                &:hover img {
                    transform: scale(1.1);
                }

                .image-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 6px;
                    transition: opacity 0.3s ease;
                }
                
                &:hover .image-overlay {
                    opacity: 0.5;
                }
            }

            .image-info {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 8px 0;
                min-width: 0;
                gap: 8px;
                position: relative;
                z-index: 2;

                .image-name {
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 6px;
                    text-align: left;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
                    position: relative;
                    
                    &::before {
                        content: '★';
                        position: absolute;
                        left: -20px;
                        color: #fbbf24;
                        font-size: 14px;
                        animation: twinkle 2s infinite;
                    }
                }

                .image-development {
                    color: #f3f4f6;
                    font-size: 13px;
                    margin-bottom: 4px;
                    font-weight: 500;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                    line-height: 1.4;
                }

                .image-identity {
                    color: #fbbf24;
                    font-size: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    background: rgba(0, 0, 0, 0.3);
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 600;
                    border: 1px solid rgba(251, 191, 36, 0.3);
                }
            }
        }
    }
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes slide {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    75% { transform: rotate(-10deg); }
}

@keyframes twinkle {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
}
</style>