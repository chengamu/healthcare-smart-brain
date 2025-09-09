import * as components from '@element-plus/icons-vue'

export default {
    install: (app) => {
        // 注册 Element Plus 图标组件
        for (const key in components) {
            const componentConfig = components[key];
            app.component(componentConfig.name, componentConfig);
        }
    },
};