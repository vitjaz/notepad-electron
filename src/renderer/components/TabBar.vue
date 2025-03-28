<template>
  <div class="tab-bar">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      :class="['tab', { active: activeTabId === tab.id }]"
      @click="setActiveTab(tab.id)"
    >
      <span>{{ tab.title }}</span>
      <button class="close-btn" @click.stop="closeTab(tab.id)">×</button>
    </div>
    <button class="new-tab-btn" @click="addNewTab">+</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTabsStore } from "../store/tabs";

const tabsStore = useTabsStore();
const { tabs, activeTabId } = storeToRefs(tabsStore);
const { addNewTab, closeTab, setActiveTab } = tabsStore;
</script>

<style scoped>
.tab-bar {
  display: flex;
  background: #f0f0f0;
  border-bottom: 1px solid #ccc;
  height: 32px;
  overflow-x: auto;
}

.tab {
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-right: 1px solid #ccc;
  cursor: pointer;
  white-space: nowrap;
  background: #e0e0e0;
}

.tab.active {
  background: white;
  font-weight: bold;
}

.close-btn {
  margin-left: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
}

.close-btn:hover {
  color: #000;
}

.new-tab-btn {
  padding: 0 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
</style>
