<template>
  <div class="editor-container">
    <textarea
      v-if="activeTab"
      v-model="activeTab.content"
      @input="handleInput"
      class="editor"
      spellcheck="false"
    ></textarea>
    <div v-else class="empty-state">
      <p>No open files</p>
      <button @click="addNewTab">Create new file</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTabsStore } from "../store/tabs";
import { storeToRefs } from "pinia";

const tabsStore = useTabsStore();
const { activeTabId, tabs } = storeToRefs(tabsStore);
const { addNewTab, updateTabContent } = tabsStore;

const activeTab = computed(() =>
  tabsStore.tabs.find((tab) => tab.id === activeTabId.value)
);
const handleInput = (e: Event) => {
  if (activeTabId.value) {
    updateTabContent(
      activeTabId.value,
      (e.target as HTMLTextAreaElement).value
    );
  }
};
</script>

<style scoped>
.editor-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.editor {
  flex: 1;
  border: none;
  padding: 10px;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  white-space: pre;
  overflow: auto;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
}
</style>
