<template>
  <div>
    <el-button type="danger" @click="showEdit('add')">新增分类</el-button>
    <Table
      :columns="columns"
      :showPagination="false"
      :dataSource="tableData"
      :fetch="loadDataList"
      :options="tableOptions"
    >
      <template #cover="{ index, row }">
        <Cover :cover="row.cover"></Cover>
      </template>
      <template #op="{ index, row }">
        <div class="op">
          <a
            href="javascript:void(0)"
            class="a-link"
            @click="showEdit('update', row)"
            >修改</a
          >
          <el-divider direction="vertical"></el-divider>
          <a href="javascript:void(0)" class="a-link">删除</a>
          <el-divider direction="vertical"></el-divider>
          <a href="javascript:void(0)" class="a-link">上移</a>
          <el-divider direction="vertical"></el-divider>
          <a href="javascript:void(0)" class="a-link">下移</a>
        </div>
      </template>
    </Table>
    <Dialog
      :title="dialogConfig.title"
      :buttons="dialogConfig.buttons"
      @close="dialogConfig.show = false"
      :show="dialogConfig.show"
      width="500px"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="80px"
      >
        <el-form-item prop="categoryName" label="名称">
          <el-input v-model="formData.categoryName" placeholder="请输入名称">
          </el-input>
        </el-form-item>
        <el-form-item prop="cover" label="封面">
          <CoverUpload v-model="formData.cover"></CoverUpload>
        </el-form-item>
        <el-form-item prop="checkCode" label="简介">
          <el-input
            v-model="formData.categoryDesc"
            placeholder="简介"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from "vue";
const { proxy } = getCurrentInstance();
// 定义api
const api = {
  // 获取博客分类
  loadDataList: "/category/loadAllCategory4Blog",
};
// 封装的Table组件的一些属性
const columns = [
  {
    label: "封面",
    prop: "cover",
    width: 100,
    scopedSlots: "cover",
  },
  {
    label: "名称",
    prop: "categoryName",
    width: 200,
  },
  {
    label: "简介",
    prop: "categoryDesc",
  },
  {
    label: "博客数量",
    prop: "blogCount",
    width: 100,
  },
  {
    label: "操作",
    prop: "op",
    width: 200,
    scopedSlots: "op",
  },
];

const tableData = reactive({});
const tableOptions = {
  extHeight: 10,
};

const loadDataList = async () => {
  let result = await proxy.Request({
    url: api.loadDataList,
  });
  if (!result) {
    return;
  }
  tableData.list = result.data;
};

//新增，修改
const dialogConfig = reactive({
  title: "标题",
  show: false,
  buttons: [
    {
      type: "danger",
      text: "确定",
      click: (e) => {
        console.log("确定 ");
      },
    },
  ],
});

const formData = reactive({});

const rules = {};

/*
    type: 是新增还是修改
    data: 如果是修改，则指明修改哪个分类
*/
const showEdit = (type, data) => {
  dialogConfig.show = true;
};
</script>

<style lang="scss"></style>
