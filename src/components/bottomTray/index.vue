<template>
    <div class="bottom-tray">
        <!-- svg线条动画 -->
        <mSvglineAnimation class="bottom-svg-line-left" :width="721" :height="57" color="#30DCFF" :strokeWidth="2"
            :dir="[0, 1]" :length="50"
            path="M1 56.6105C1 31.5123 185.586 10.0503 451.904 1.35519C458.942 1.12543 465.781 4.00883 470.505 9.22964L484.991 25.2383C487.971 28.4775 492.938 30.4201 498.254 30.4201H720.142">
        </mSvglineAnimation>
        <mSvglineAnimation class="bottom-svg-line-left bottom-svg-line-right" :width="721" :height="57" color="#30DCFF"
            :strokeWidth="2" :dir="[0, 1]" :length="50"
            path="M1 56.6105C1 31.5123 185.586 10.0503 451.904 1.35519C458.942 1.12543 465.781 4.00883 470.505 9.22964L484.991 25.2383C487.971 28.4775 492.938 30.4201 498.254 30.4201H720.142">
        </mSvglineAnimation>
        
        <!-- 中间信息区域 -->
        <div class="bottom-tray-center">
            <div class="support-info">
                <div class="support-item">
                    <span class="support-label">技术支持：</span>
                    <span class="support-value">浙江贝基曼巴新材料有限公司</span>
                </div>
                <div class="support-item">
                    <span class="support-label">联系方式：</span>
                    <span class="support-value">400-833-0018</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import mSvglineAnimation from "@/components/mSvglineAnimation/index.vue"
</script>

<style lang="scss">
.bottom-svg-line-left,
.bottom-svg-line-right {
    position: absolute;
    right: 50%;
    width: 721px;
    height: 57px;
    margin-right: -5px;
    bottom: -21px;
}
.bottom-svg-line-right {
    transform: scaleX(-1);
    left: 50%;
    right: inherit;
    margin-right: inherit;
    margin-left: -5px;
}
.bottom-tray {
    transform: translateY(100%);
    opacity: 0;
    position: relative;
}

/* 中间信息区域 */
.bottom-tray-center {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}

.support-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 12px;
    /* 顶部装饰线 */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 2px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(48, 220, 255, 0.8) 50%, 
            transparent 100%);
        border-radius: 1px;
    }
}

.support-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 1.4;
    white-space: nowrap;
}

.support-label {
    color: #94a3b8;
    font-weight: 400;
    margin-right: 6px;
}

.support-value {
    color: #e2e8f0;
    font-weight: 500;
    
    /* 联系方式的特殊样式 */
    .support-item:nth-child(2) & {
        color: #30DCFF;
    }
}

/* 响应式设计 */
@media (max-width: 1200px) {
    .support-info {
        padding: 10px 20px;
        gap: 6px;
    }
    
    .support-item {
        font-size: 11px;
    }
}

@media (max-width: 768px) {
    .support-info {
        padding: 8px 16px;
        gap: 4px;
    }
    
    .support-item {
        font-size: 10px;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
    }
    
    .support-label {
        margin-right: 0;
    }
}
</style>