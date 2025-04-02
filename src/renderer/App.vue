<template>
  <div class="app">
    <div class="menu-bar">
      <ElButton @click="openFile">Open</ElButton>
      <ElButton @click="saveFile" :disabled="!activeTab">Save</ElButton>
      <ElButton @click="saveAsFile" :disabled="!activeTab">Save as...</ElButton>
    </div>
    <TabBar />
    <Editor />
  </div>
</template>

<script setup lang="ts">
import { ElButton, ElMessage } from "element-plus";
import TabBar from "./components/TabBar.vue";
import Editor from "./components/Editor.vue";
import { useTabsStore } from "./store/tabs";
import { storeToRefs } from "pinia";
import { useElectronApi } from "./composables/useElectronApi";
import { computed } from "vue";

const tabsStore = useTabsStore();
const { activeTabName, tabs } = storeToRefs(tabsStore);
const { openFileInTab } = tabsStore;

const electronApi = useElectronApi();

const activeTab = computed(() =>
  tabs.value.find((tab) => tab.name === activeTabName.value)
);
const openFile = async () => {
  try {
    const filePath = await electronApi.openFile();
    if (filePath) {
      const { content } = await electronApi.readFile(filePath);
      if (content) {
        openFileInTab(filePath, content);
      }
    }
  } catch (error) {
    console.error("Error while opening file:", error);
  }
};

const saveFile = async () => {
  if (!activeTabName.value || !activeTab.value) return;

  try {
    const filePath = activeTab.value.filePath;
    // todo
    if (!filePath) {
      await saveAsFile();
      return;
    }

    const result = await electronApi.saveFile(
      filePath,
      activeTab.value.content
    );
    if (result.success) {
      activeTab.value.isDirty = false;
      ElMessage.success({
        message: "File saved!",
      });
    } else {
      ElMessage.error({
        message: "File can't be save!",
      });
    }
  } catch (error) {
    console.error("Error while saving file:", error);
    ElMessage.error({
      message: `${error}`,
    });
  }
};

const saveAsFile = async () => {
  // todo
  console.log("Save As...");
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.menu-bar {
  padding: 5px;
}
</style>
