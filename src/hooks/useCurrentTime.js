import { ref, onMounted, onUnmounted } from 'vue'

export function useCurrentTime(format = 'YYYY年MM月DD日 HH:mm:ss 星期W') {
    const currentTime = ref('')

    function formatTime(date, formatString) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        const weekdays = ['日', '一', '二', '三', '四', '五', '六']
        const weekday = weekdays[date.getDay()]

        // 根据传入的格式字符串替换对应的值
        return formatString
            .replace(/YYYY/g, year)
            .replace(/MM/g, month)
            .replace(/DD/g, day)
            .replace(/HH/g, hours)
            .replace(/mm/g, minutes)
            .replace(/ss/g, seconds)
            .replace(/W/g, weekday)
    }

    let timer = null

    onMounted(() => {
        currentTime.value = formatTime(new Date(), format)
        timer = window.setInterval(() => {
            currentTime.value = formatTime(new Date(), format)
        }, 1000)
    })

    onUnmounted(() => {
        if (timer) {
            window.clearInterval(timer)
            timer = null
        }
    })

    return {
        currentTime
    }
}