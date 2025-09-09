// src/directive/autoScroll.js

const autoScroll = {
    mounted(el, binding) {
        const {
            step = 1,
            interval = 50
        } = binding.value || {}

        let scrollInterval = null

        const startScroll = () => {
            if (scrollInterval) return

            scrollInterval = setInterval(() => {
                const { scrollTop, scrollHeight, clientHeight } = el

                if (scrollTop + clientHeight >= scrollHeight) {
                    el.scrollTop = 0
                } else {
                    el.scrollTop += step
                }
            }, interval)
        }

        const stopScroll = () => {
            if (scrollInterval) {
                clearInterval(scrollInterval)
                scrollInterval = null
            }
        }

        // 启动滚动
        startScroll()

        // 绑定鼠标事件（可选）：悬停停止滚动
        el.addEventListener('mouseenter', stopScroll)
        el.addEventListener('mouseleave', startScroll)

        // 将stopScroll函数存储在元素上，以便在指令卸载时使用
        el._scrollStop = stopScroll
    },
    
    unmounted(el) {
        // 指令卸载时清除定时器
        if (el._scrollStop) {
            el._scrollStop()
            el.removeEventListener('mouseenter', el._scrollStop)
            el.removeEventListener('mouseleave', el._scrollStop)
            el._scrollStop = null
        }
    }
}

export default autoScroll