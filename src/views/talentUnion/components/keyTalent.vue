<script setup>
import mCard from "@/components/mCard/index.vue"
import keyTalent from "@/views/gdMap/map/keyTalent.js";

const props = defineProps({
    title: {
        type: String,
        default: '联盟重点人才'
    },
    height: {
        type: Number,
        default: 838
    }
})
</script>

<template>
  <div class="right-card">
    <m-card :title="title" :height="height">
      <div class="key-talent-container" v-auto-scroll>
        <div class="image-list">
          <div
              v-for="image in keyTalent"
              :key="image.name"
              class="image-item"
          >
            <img :src="image.src" :alt="image.name" />
            <div class="image-info">
              <div class="image-name">{{ image.name }}</div>
              <div class="image-development">擅长领域：{{ image.development }}</div>
              <div class="image-identity">身份：{{ image.identity }}</div>
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

  .image-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr); // 改为单列布局
    gap: 16px;

    .image-item {
      position: relative;
      display: flex;
      align-items: center;
      border-radius: 4px;
      overflow: hidden;
      width: 100%; // 确保宽度为100%
      aspect-ratio: auto; // 取消固定宽高比
        cursor: pointer;

      img {
        width: 60px; // 固定图片宽度
        height: 80px;
        object-fit: cover;
        border-radius: 4px;
        border: 1px solid #666;
        margin: 0 10px;
      }

      .image-info {
        flex: 1; // 占据剩余空间
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 4px 0;
        min-width: 0; // 允许文本截断
          gap: 4px;

        .image-name {
          color: #ffffff;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 4px;
          transform: none; // 移除悬停效果
          background: none;
          padding: 0;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .image-development {
          color: #D3F8F2;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 2px;
        }
        
        .image-identity {
          color: #a0d3ff;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      // 移除悬停效果相关样式
      &:hover .image-name {
        transform: none; // 移除悬停变换
      }
    }
  }
}
</style>