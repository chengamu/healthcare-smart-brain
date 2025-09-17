<template>
    <div class="left-card">
        <m-card title="组织架构总览">
            <div class="party-organization-container">
                <div class="party-tree-structure">
                    <div class="party-organization party-organization-main">绍兴医疗健康产业社区功能性联合党委</div>
                    <div class="party-organization-children">
                        <div class="party-organization party-organization-junior">科技型企业<br>党总支</div>
                        <div class="party-organization party-organization-junior">服务性机构<br>党支部</div>
                        <div class="party-organization party-organization-junior">社区管理<br>党支部</div>
                        <div class="party-organization party-organization-junior">新兴领域流动<br>党员党支部</div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>
<script setup>
import mCard from "@/components/mCard/index.vue"


</script>

<style lang="scss">
.party-organization-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 1.25rem;
    box-sizing: border-box;
    background: linear-gradient(135deg, 
        rgba(220, 38, 38, 0.05) 0%, 
        rgba(239, 68, 68, 0.05) 50%,
        rgba(185, 28, 28, 0.05) 100%);
    border-radius: 12px;
    
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
}

.party-tree-structure {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
}

.party-organization {
    box-sizing: border-box;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    z-index: 5;
    position: relative;
    transition: all 0.3s ease;
    font-weight: 600;
    letter-spacing: 0.5px;
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 25px currentColor;
    }
}

.party-organization-main {
    width: 20rem;
    height: 3.5rem;
    line-height: 3.5rem;
    background: linear-gradient(135deg, 
        rgba(220, 38, 38, 0.9) 0%, 
        rgba(239, 68, 68, 0.8) 50%,
        rgba(185, 28, 28, 0.9) 100%);
    border: 2px solid #dc2626;
    color: #ffffff;
    margin-bottom: 4rem;
    font-size: 16px;
    text-shadow: 0 0 10px rgba(220, 38, 38, 0.8);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: slide 3s infinite;
    }
    
    &::after {
        content: '★';
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: #fbbf24;
        font-size: 18px;
        animation: glow 2s infinite alternate;
    }
}

.party-organization-children {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    width: 100%;
    position: relative;
    max-width: 100%;
    padding: 0 1rem;
}

.party-organization-children::before {
    content: '';
    position: absolute;
    top: -4rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 2rem;
    background: linear-gradient(to bottom, #dc2626, #ef4444);
    z-index: 4;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(220, 38, 38, 0.6);
}

.party-organization-children::after {
    content: '';
    position: absolute;
    top: -2rem;
    left: 14%;
    width: 72%;
    height: 3px;
    background: linear-gradient(90deg, #dc2626, #ef4444, #dc2626);
    z-index: 3;
    border-radius: 2px;
    box-shadow: 0 0 6px rgba(220, 38, 38, 0.5);
}

.party-organization-junior {
    width: 100%;
    height: 3.5rem;
    line-height: 1.2rem;
    background: linear-gradient(135deg, 
        rgba(239, 68, 68, 0.8) 0%, 
        rgba(248, 113, 113, 0.7) 50%,
        rgba(220, 38, 38, 0.8) 100%);
    border: 2px solid #ef4444;
    color: #ffffff;
    position: relative;
    font-size: 12px;
    font-weight: 600;
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
    // overflow: hidden;
    padding: 6px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
        content: '';
        position: absolute;
        top: -2rem;
        left: 50%;
        transform: translateX(-50%);
        width: 3px;
        height: 2rem;
        background: linear-gradient(to bottom, #dc2626, #ef4444);
        border-radius: 2px;
        box-shadow: 0 0 6px rgba(220, 38, 38, 0.6);
    }
    
    &:nth-child(odd)::after {
        content: '🚩';
        position: absolute;
        bottom: 2px;
        right: 2px;
        font-size: 12px;
        animation: wave 2s infinite;
    }
    
    &:nth-child(even)::after {
        content: '⭐';
        position: absolute;
        bottom: 2px;
        right: 2px;
        font-size: 12px;
        animation: twinkle 2s infinite;
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

@keyframes glow {
    from { text-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24; }
    to { text-shadow: 0 0 20px #fbbf24, 0 0 30px #fbbf24; }
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
