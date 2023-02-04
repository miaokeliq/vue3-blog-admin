<template>
  <div>
    <el-dialog
      :show-close="false"
      :draggable="true"
      :model-value="show"
      :close-on-click-modal="false"
      :title="title"
      class="cust-dialog"
      :top="top"
      :width="width"
      :showCalcel="showCalcel"
    >
      <div class="dialog-body">
        <slot> </slot>
      </div>
      <template v-if="(buttons && buttons.length > 0) || showCalcel">
        <div class="dialog-footer">
          <el-button link @click="close"> 取消 </el-button>
          <el-button
            v-for="(btn, index) in buttons"
            :key="index"
            :type="btn.type"
            @click="btn.click"
          >
            {{ btn.text }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  title: {
    type: String,
  },
  show: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showCalcel: {
    type: Boolean,
    default: true,
  },
  top: {
    type: String,
    default: "50px",
  },
  width: {
    type: String,
    default: "30% ",
  },
  buttons: {
    type: Array,
  },
});

const emit = defineEmits();
const close = () => {
  emit("close");
};
</script>

<style lang="scss">
.cust-dialog {
  .el-dialog__body {
    padding: 0px;
    .dialog-body {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      padding: 10px;
      min-height: 80px;
    }
    .dialog-footer {
      text-align: right;
      padding: 5px 20px;
    }
  }
}
</style>
