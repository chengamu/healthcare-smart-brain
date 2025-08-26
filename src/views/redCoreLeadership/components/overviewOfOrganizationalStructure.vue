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
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    z-index: 5;
    position: relative;
}

.party-organization-main {
    width: 20rem;
    height: 3rem;
    line-height: 3rem;
    background: radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 0, 0.1) 70%);
    border: 0.0625rem solid #ff0000;
    color: #ff0000;
    margin-bottom: 4rem;
}

.party-organization-children {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    position: relative;
}

.party-organization-children::before {
    content: '';
    position: absolute;
    top: -4rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.125rem;
    height: 2rem;
    background: linear-gradient(to top, #ff4d4d, #ff0000);
    z-index: 4;
}

.party-organization-children::after {
    content: '';
    position: absolute;
    top: -2rem;
    left: 12%;
    width: 76%;
    height: 0.125rem;
    background: #ff4d4d;
    z-index: 3;
}

.party-organization-junior {
    width: 6rem;
    height: 4rem;
    line-height: 1.5rem;
    background: radial-gradient(circle, rgba(255, 77, 77, 0.3) 0%, rgba(255, 77, 77, 0.1) 70%);
    border: 0.125rem solid #ff4d4d;
    color: #ff4d4d;
    position: relative;
}

.party-organization-junior::before {
    content: '';
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.125rem;
    height: 2rem;
    background: linear-gradient(to top, #ff4d4d, #ff0000);
}

.party-organization-main:hover, .party-organization-junior:hover {
    transform: scale(1.1);
    box-shadow: 0 0 1.5rem currentColor;
}
</style>
