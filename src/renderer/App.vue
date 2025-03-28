<template>
  <div class="app">
    <div class="menu-bar">
      <button @click="openFile">Open</button>
      <button @click="saveFile" :disabled="!activeTab">Save</button>
      <button @click="saveAsFile" :disabled="!activeTab">Save as...</button>
    </div>
    <TabBar />
    <Editor />
  </div>
</template>

<script setup lang="ts">
import TabBar from "./components/TabBar.vue";
import Editor from "./components/Editor.vue";
import { useTabsStore } from "./store/tabs";
import { storeToRefs } from "pinia";
import { useElectronApi } from "./composables/useElectronApi";
import { computed } from "vue";

const tabsStore = useTabsStore();
const { activeTabId, tabs } = storeToRefs(tabsStore);
const { addNewTab, openFileInTab } = tabsStore;

const electronApi = useElectronApi();

const activeTab = computed(() =>
  tabsStore.tabs.find((tab) => tab.id === activeTabId.value)
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
  if (!activeTabId.value || !activeTab.value) return;

  try {
    const filePath = activeTab.value.filePath;
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
    }
  } catch (error) {
    console.error("Error while saving file:", error);
  }
};

const saveAsFile = async () => {
  // todo
  console.log("Save As...");
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.menu-bar {
  padding: 5px;
  background: #f0f0f0;
  border-bottom: 1px solid #ccc;
}

.menu-bar button {
  margin-right: 5px;
  padding: 3px 10px;
}
</style>
