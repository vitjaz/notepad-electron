<template>
  <div>
    <el-tabs
      v-model="activeTabName"
      type="card"
      class="tabs"
      closable
      addable
      @tab-add="addNewTab"
      @tab-remove="closeTab"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.id"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTabsStore } from "../store/tabs";

import { ElTabs, ElTabPane, TabPaneName } from "element-plus";

const tabsStore = useTabsStore();
const { tabs, activeTabName } = storeToRefs(tabsStore);
const { addNewTab, closeTab } = tabsStore;
</script>

<style scoped></style>
