<template>
    <div class="count-card corridor-container">
        <div class="corridor-bg"></div>
        <div class="timeline-axis">
            <!-- History Section -->
            <div class="history-section">
                <div class="glass-pipe">
                    <div class="flow-stream stream1"></div>
                    <div class="flow-stream stream2"></div>
                    <div class="flow-stream stream3"></div>
                </div>
                <div id="m1" class="milestone">
                    <div class="label">2023 | 基金成立</div>
                    <div class="dot"></div>
                </div>
                <div id="m2" class="milestone">
                    <div class="dot"></div>
                    <div class="label">2024 | 重大项目签约</div>
                </div>
                <div id="m3" class="milestone">
                    <div class="label">龙头企业入驻</div>
                    <div class="dot"></div>
                </div>
            </div>

            <!-- Current Value Section -->
            <div class="current-value-section">
                <div class="current-value">{{ animatedValue }}<span style="font-weight: normal; font-size: 32px">亿</span></div>
            </div>

            <!-- ECharts Gauge Section -->
            <div class="goal-section-echarts">
                <div id="echarts-gauge" ref="gaugeChartRef"></div>
                <div class="target-label-container">
                    <div class="target-label-text">目标: {{ goalValue }}亿</div>
                    <div class="target-label-base"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';
import { gsap } from 'gsap';

// Props for the component to be dynamic
const props = defineProps({
    currentValue: {
        type: Number,
        required: true
    },
    goalValue: {
        type: Number,
        default: 200
    },
    animationDuration: {
        type: Number,
        default: 2
    }
});

const gaugeChartRef = ref(null);
let gaugeChartInstance = null;
const animatedValue = ref(0.0);

// ECharts option based on the provided HTML
const getOption = (value) => {
    return {
        series: [
            {
                type: 'gauge',
                radius: '100%',
                startAngle: 210,
                endAngle: -30,
                min: 0,
                max: props.goalValue,
                splitNumber: 10,
                pointer: { show: false },
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: [[1, 'rgba(0, 191, 255, 0.3)']],
                        shadowColor: 'rgba(0, 191, 255, 0.5)',
                        shadowBlur: 15
                    }
                },
                axisTick: {
                    length: 6,
                    lineStyle: { color: 'auto' }
                },
                splitLine: {
                    length: 10,
                    lineStyle: { color: 'auto' }
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 12
                },
                data: [{ value: value }],
                detail: {
                    show: true,
                    fontSize: 20,
                    color: '#fff',
                    offsetCenter: [0, '0%'],
                    fontWeight: 'bold',
                    formatter: function (val) {
                        return ((val / props.goalValue) * 100).toFixed(2) + '%';
                    }
                }
            },
            {
                type: 'gauge',
                radius: '85%',
                startAngle: 210,
                endAngle: -30,
                min: 0,
                max: props.goalValue,
                pointer: { show: false },
                axisLine: {
                    lineStyle: {
                        width: 12,
                        color: [[1, 'rgba(100, 100, 100, 0.2)']]
                    }
                },
                progress: {
                    show: true,
                    width: 12,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#FFA500' },
                            { offset: 1, color: '#FFD700' }
                        ]),
                        shadowColor: 'rgba(255, 215, 0, 0.5)',
                        shadowBlur: 10
                    }
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { show: false },
                data: [{ value: value }]
            }
        ]
    };
};

// Function to run the animations for both number and gauge
const animateValues = () => {
    // Use GSAP for a smooth number count-up animation
    gsap.to(animatedValue, {
        duration: props.animationDuration,
        value: props.currentValue,
        onUpdate: () => {
            // Ensure the animated value is formatted correctly
            animatedValue.value = parseFloat(animatedValue.value.toFixed(1));
        }
    });

    // Update ECharts with the new value
    if (gaugeChartInstance) {
        gaugeChartInstance.setOption({
            series: [
                { data: [{ value: props.currentValue }] },
                { data: [{ value: props.currentValue }] }
            ]
        });
    }
};

// Lifecycle hooks
onMounted(() => {
    // Initialize ECharts instance on component mount
    gaugeChartInstance = echarts.init(gaugeChartRef.value);
    gaugeChartInstance.setOption(getOption(0)); // Initialize with 0 to show the animation

    // Start the animations after a short delay
    setTimeout(animateValues, 500);

    // Add a resize listener to make the chart responsive
    window.addEventListener('resize', () => {
        if (gaugeChartInstance) {
            gaugeChartInstance.resize();
        }
    });
});

onUnmounted(() => {
    // Dispose of the ECharts instance to prevent memory leaks
    if (gaugeChartInstance) {
        gaugeChartInstance.dispose();
    }
    // Remove the resize listener
    window.removeEventListener('resize', () => {
        if (gaugeChartInstance) {
            gaugeChartInstance.resize();
        }
    });
});

// Watch for changes in the 'currentValue' prop to trigger new animations
watch(() => props.currentValue, () => {
    animateValues();
});
</script>

<style scoped>
/*
  The CSS is copied directly from the original HTML file.
  You can move this to a separate CSS file or keep it scoped.
  Make sure to add the Orbitron font link in your main index.html file.
*/

body, html {
    margin: 0; padding: 0; width: 100%; height: 100%;
    background-color: #000411;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
}
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
.corridor-bg {
    position: absolute; width: 100%; height: 1000px; top: 50%; left: 50%;
    transform-style: preserve-3d; transform: translate(-50%, -50%) rotateX(80deg);
    background-image:
        linear-gradient(rgba(0,191,255,0.2) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,191,255,0.2) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: move-grid 8s linear infinite;
}
@keyframes move-grid { from { background-position: 0 0; } to { background-position: 0 -200px; } }

/* --- 关键：调整Grid布局 --- */
.timeline-axis {
    width: 100%; height: 100%; position: relative;
    display: grid;
    grid-template-columns: 55% auto 25%;
    align-items: center;
    gap: 0;
    padding: 0 20px;
    box-sizing: border-box;
}

.history-section {
    grid-column: 1 / 2;
    height: 40px; position: relative;
}
.glass-pipe {
    width: 100%; height: 100%; border: 1px solid rgba(72, 209, 204, 0.3);
    border-radius: 30px; position: relative; overflow: hidden;
    background: linear-gradient(to right, rgba(72,209,204,0.05), rgba(72,209,204,0.15));
    box-shadow: inset 0 0 15px rgba(72, 209, 204, 0.2);
}
.flow-stream { position: absolute; height: 3px; border-radius: 2px; background: linear-gradient(to right, transparent, #fff); animation: flow-right 5s linear infinite; }
.stream1 { top: 35%; width: 20%; background: linear-gradient(to right, transparent, #FFD700); animation-duration: 4s; }
.stream2 { top: 55%; width: 30%; background: linear-gradient(to right, transparent, #48D1CC); animation-duration: 6s; }
.stream3 { top: 75%; width: 25%; background: linear-gradient(to right, transparent, #00BFFF); animation-duration: 5s; }
@keyframes flow-right { from { left: -30%; } to { left: 110%; } }
.milestone { position: absolute; color: white; text-align: center; animation: appear 1s ease-out forwards; opacity: 0; transform: translateY(-50%); }
.milestone .dot { width: 8px; height: 8px; background: #48D1CC; border-radius: 50%; margin: 0 auto 5px; box-shadow: 0 0 10px #48D1CC; }
.milestone .label { font-size: 18px; }
#m1 { left: 15%; top: -12px; animation-delay: 0.5s; }
#m2 { left: 45%; top: calc(100% + 20px); animation-delay: 1s; }
#m3 { left: 75%; top: -12px; animation-delay: 1.5s; }
@keyframes appear { to { opacity: 1; } }

.current-value-section {
    grid-column: 2 / 3;
    text-align: center;
    padding: 0 10px;
}
.current-value {
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: 48px;
    color: #FFD700;
    line-height: 1;
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.7);
}

.goal-section-echarts {
    height: 100%;
    position: relative;
    grid-column: 3 / 4;
}
#echarts-gauge {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 100%;
}

.target-label-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    width: 200px;
    text-align: center;
}
.target-label-text {
    font-family: 'Orbitron', sans-serif;
    font-size: 24px;
    color: #fff;
    letter-spacing: 2px;
    padding: 5px 15px;
}
.target-label-base {
    height: 10px;
    background: #00BFFF;
    border-radius: 5px;
    box-shadow: 0 0 20px #00BFFF;
    animation: base-glow 3s infinite ease-in-out;
}
@keyframes base-glow {
    50% { box-shadow: 0 0 30px 5px #00BFFF; }
}
</style>
