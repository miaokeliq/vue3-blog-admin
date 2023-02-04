<template>
  <div class="cover">
    <img :src="proxy.globalInfo.imageUrl + cover" v-if="cover" />
    <img src="../assets/default_img.jpg" v-else />
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from "vue";

// 父组件传参数定义props
const props = defineProps({
  cover: {
    type: String,
  },
});

const { proxy } = getCurrentInstance();
</script>

<style lang="scss">
.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #ddd;
  img {
    width: 60px;
  }
}
</style>
