<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import mCard from "@/components/mCard/index.vue"

// 引入keyTalent目录下的所有图片
import lbj from "@/assets/images/keyTalent/刘滨磊.png"
import wml from "@/assets/images/keyTalent/吴美兰.png"
import xjg from "@/assets/images/keyTalent/徐建国.jpg"
import mht from "@/assets/images/keyTalent/明恒泰.png"
import lmd from "@/assets/images/keyTalent/李明定.jpg"
import lxx from "@/assets/images/keyTalent/李晓旭.jpg"
import sjj from "@/assets/images/keyTalent/沈卫军.png"
import sy from "@/assets/images/keyTalent/石彦.png"
import dc from "@/assets/images/keyTalent/董晨.png"
import gjh from "@/assets/images/keyTalent/郭劲宏.png"
import cdw from "@/assets/images/keyTalent/陈东文.png"
import hyx from "@/assets/images/keyTalent/韩永信.jpeg"

// 图片数据数组
const images = ref([
  { src: lbj, name: '刘滨磊', development: '溶瘤病毒', identity: '武汉滨会生物科技股份有限公司/滨会生物科技（浙江）有限公司创始人' },
  { src: wml, name: '吴美兰', development: '药学', identity: '浙江景岳堂药业有限公司研发部经理' },
  { src: xjg, name: '徐建国', development: '微生物学', identity: '中国工程院院士、中国疾病预防控制中心传染病预防控制国家重点实验室主任、绍兴迈亚塔菌检智能科技有限公司首席科学家' },
  { src: mht, name: '明恒泰', development: '预防保健及健康体检管理', identity: '美年健康集团医疗质量管理委员会主检专委会主任委员、江浙公司主检中心主任' },
  { src: lmd, name: '李明定', development: '神经生物学', identity: '欧洲自然科学院外籍院士、浙江大学求是讲席特聘教授、绍兴迈亚塔菌检智能科技有限公司董事长' },
  { src: lxx, name: '李晓旭', development: '质谱仪', identity: '苏州大学机电工程学院教授、博纳科捷（绍兴）科技有限公司技术总监' },
  { src: sjj, name: '沈卫军', development: '新药研发', identity: '昌平国家实验室转化医学中心主任、绍兴生物医药创新中心主任' },
  { src: sy, name: '石彦', development: '免疫学', identity: '清华大学教授、博迪贺康（绍兴）生物技术有限公司创始人' },
  { src: dc, name: '董晨', development: '免疫学', identity: '中国科学院院士、西湖大学医学院首任院长、鑫康合生物创始人' },
  { src: gjh, name: '郭劲宏', development: '生物与新医药（信息科学与医学）', identity: '国家重点研发计划首席科学家、上海交通大学感知科学与工程学院研究员、重庆医科大学绍兴柯桥医学检验技术研究中心主任' },
  { src: cdw, name: '陈东文', development: '医疗器械', identity: '辰德资本投资总监' },
  { src: hyx, name: '韩永信', development: '药化', identity: '龙磐投资合伙人' },
])
</script>

<template>
  <div class="right-card">
    <m-card title="联盟重点人才" :height="838">
      <div class="key-talent-container" v-auto-scroll>
        <div class="image-list">
          <div
              v-for="image in images"
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