<script setup>
import mCard from "@/components/mCard/index.vue"
import keyPartyMember from "@/views/gdMap/map/keyPartyMember.js";

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
                            <img :src="image.src" :alt="image.name" />
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
    background: linear-gradient(135deg, 
        rgba(220, 38, 38, 0.05) 0%, 
        rgba(239, 68, 68, 0.05) 50%,
        rgba(185, 28, 28, 0.05) 100%);
    border-radius: 12px;
    position: relative;
    box-sizing: border-box;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #dc2626, transparent);
        animation: shimmer 3s infinite;
    }

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
            background: linear-gradient(135deg, 
                rgba(220, 38, 38, 0.8) 0%, 
                rgba(239, 68, 68, 0.7) 50%,
                rgba(185, 28, 28, 0.8) 100%);
            border: 2px solid rgba(220, 38, 38, 0.6);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
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
                    background: linear-gradient(135deg, 
                        rgba(220, 38, 38, 0.3) 0%, 
                        rgba(239, 68, 68, 0.2) 50%,
                        rgba(185, 28, 28, 0.3) 100%);
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