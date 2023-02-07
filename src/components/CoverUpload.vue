<template>
  <el-upload
    name="file"
    :show-file-list="false"
    accept=".png,.PNG,.jpg,.JPG,.jpeg,.JPEG,.gif,.GIF,.bmp,.BMP"
    :multiple="false"
    :http-request="uploadImage"
  >
    <!-- 需要判断，如果是修改，还要显示原本就有的封面 -->
    <div class="cover-upload-btn">
      <!-- 用template做v-if判断就不会产生多余的标签 -->
      <template v-if="modelValue">
        <img :src="proxy.globalInfo.imageUrl + modelValue" />
      </template>
      <span class="iconfont icon-add" v-else></span>
    </div>
  </el-upload>
</template>

<script setup>
import { clippingParents } from "@popperjs/core";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const props = defineProps({
  // modelValue 为约定俗成的字段，为父组件传来的v-model绑定的值
  modelValue: {
    type: String,
    default: null,
  },
});

const api = {
  uploadUrl: "file/uploadImage",
};

const emit = defineEmits();
const uploadImage = async (file) => {
  let result = await proxy.Request({
    url: api.uploadUrl,
    dataType: "file",
    params: {
      file: file.file,
      type: 0,
    },
  });
  const fileName = result.data.fileName;
  emit("update:modelValue", fileName);
};
</script>

<style lang="scss">
.cover-upload-btn {
  width: 150px;
  height: 150px;
  border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  .iconfont {
    font-size: 40px;
    color: rgb(164, 164, 164);
  }
  img {
    width: 100%;
  }
}
</style>
