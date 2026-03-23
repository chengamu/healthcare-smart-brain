# healthcare-smart-brain

医疗智慧大脑前端项目，基于 `Vue 3 + Vite + Element Plus + ECharts + Three.js` 构建，用于承载智慧医疗/大屏可视化相关页面与交互。

## 技术栈

- Vue 3
- Vite 4
- Element Plus
- ECharts
- Three.js
- Pinia
- Vue Router
- Axios

## 本地开发

```bash
npm install
npm run dev
```

## 构建命令

```bash
npm run build
npm run build:prod
npm run preview
npm run generate:config
```

## 项目结构

- `src/`: 页面、组件、状态管理与业务逻辑
- `public/`: 静态资源
- `build/`: 构建辅助脚本
- `vite/`: Vite 相关配置扩展
- `.env.development`: 开发环境配置
- `.env.production`: 生产环境配置

## 说明

- 当前仓库已从内部 Gitea 迁移到 GitHub。
- 仓库内存在较大的媒体资源文件，后续如继续增长，建议切换到 Git LFS 管理。
- 建议后续补充页面模块说明、接口约定和部署流程。