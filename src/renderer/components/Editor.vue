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
      <ElButton type="success" plain @click="addNewTab"
        >Create new file</ElButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTabsStore } from "../store/tabs";
import { storeToRefs } from "pinia";
import { ElButton } from "element-plus";

const tabsStore = useTabsStore();
const { activeTabName, tabs } = storeToRefs(tabsStore);
const { addNewTab, updateTabContent } = tabsStore;

const activeTab = computed(() =>
  tabsStore.tabs.find((tab) => tab.name === activeTabName.value)
);
const handleInput = (e: Event) => {
  if (activeTabName.value) {
    updateTabContent(
      activeTabName.value,
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
  padding: 5px;
  /* font-family: "Consolas", "Monaco", monospace; */
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
  gap: 0.5rem;
}
</style>
