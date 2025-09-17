<script setup>
import mCard from "@/components/mCard/index.vue"
import {onMounted, ref} from "vue";
import {listEventAll} from "@/api/brain.js";

const eventList = ref([])

onMounted(() => {
    init()
})

async function init() {
    await getListEventAll()
}

function getListEventAll() {
    return listEventAll({ visible: '1' }).then(response => {
        eventList.value = response
    });
}
</script>

<template>
    <div class="right-card">
        <m-card title="关键里程碑">
            <div class="count-card corridor-container">
                <div class="timeline-axis">
                    <!-- History Section -->
                    <div class="history-section">
                        <div class="glass-pipe">
                            <div class="flow-stream stream1"></div>
                            <div class="flow-stream stream2"></div>
                            <div class="flow-stream stream3"></div>
                        </div>
                        <div :id="`m${index + 1}`" class="milestone" v-for="(item, index) in eventList" :key="index">
                            <template v-if="index % 2 === 1">
                                <div class="dot"></div>
                                <div class="label">{{ item.time }}<br>{{ item.name }}</div>
                            </template>
                            <template v-else>
                                <div class="label">{{ item.time }}<br>{{ item.name }}</div>
                                <div class="dot"></div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<style scoped lang="scss">
.corridor-container {
    width: 100%;
    max-width: 1800px;
    height: 200px;
    display: flex;
    align-items: center;
    position: relative;
    perspective: 1500px;
    padding: 0 !important;
}

.timeline-axis {
    width: 100%; 
    height: 100%; 
    position: relative;
    display: grid;
    grid-template-columns: 100%;
    align-items: center;
    gap: 0;
    padding: 0 20px;
    box-sizing: border-box;
}

.history-section {
    grid-column: 1 / 2;
    height: 40px; 
    position: relative;
}

.glass-pipe {
    width: 100%; 
    height: 100%; 
    border: 1px solid rgba(72, 209, 204, 0.3);
    border-radius: 30px; 
    position: relative; 
    overflow: hidden;
    background: linear-gradient(to right, rgba(72,209,204,0.05), rgba(72,209,204,0.15));
    box-shadow: inset 0 0 15px rgba(72, 209, 204, 0.2);
}

.flow-stream { 
    position: absolute; 
    height: 3px; 
    border-radius: 2px; 
    background: linear-gradient(to right, transparent, #fff); 
    animation: flow-right 5s linear infinite; 
}

.stream1 { 
    top: 35%; 
    width: 20%; 
    background: linear-gradient(to right, transparent, #FFD700); 
    animation-duration: 4s; 
}

.stream2 { 
    top: 55%; 
    width: 30%; 
    background: linear-gradient(to right, transparent, #48D1CC); 
    animation-duration: 6s; 
}

.stream3 { 
    top: 75%; 
    width: 25%; 
    background: linear-gradient(to right, transparent, #00BFFF); 
    animation-duration: 5s; 
}

@keyframes flow-right { 
    from { left: -30%; } 
    to { left: 110%; } 
}

.milestone { 
    position: absolute; 
    color: white; 
    text-align: center; 
    animation: appear 1s ease-out forwards; 
    opacity: 0; 
    transform: translateY(-50%); 
}

.milestone .dot { 
    width: 8px; 
    height: 8px; 
    background: #48D1CC; 
    border-radius: 50%; 
    margin: 0 auto 5px; 
    box-shadow: 0 0 10px #48D1CC; 
}

.milestone .label { 
    font-size: 16px; 
}

#m1 { 
    left: 0%; 
    top: -25px; 
    animation-delay: 0.5s; 
}

#m2 { 
    left: 5%; 
    top: calc(100% + 30px); 
    animation-delay: 1s; 
}

#m3 { 
    left: 45%; 
    top: -25px; 
    animation-delay: 1.5s; 
}

#m4 { 
    left: 50%; 
    top: calc(100% + 30px); 
    animation-delay: 2s; 
}

@keyframes appear { 
    to { opacity: 1; } 
}
</style>