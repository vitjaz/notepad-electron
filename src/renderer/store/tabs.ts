import { defineStore } from "pinia";
import { ref } from "vue";

interface Tab {
  id: string;
  title: string;
  content: string;
  filePath?: string;
  isDirty: boolean;
}

export const useTabsStore = defineStore("tabs", () => {
  const tabs = ref<Tab[]>([]);
  const activeTabId = ref<string | null>(null);

  const addNewTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: "Новый файл",
      content: "",
      isDirty: false,
    };

    tabs.value.push(newTab);
    activeTabId.value = newTab.id;
    return newTab;
  };

  const closeTab = (tabId: string) => {
    const index = tabs.value.findIndex((tab) => tab.id === tabId);
    if (index !== -1) {
      tabs.value.splice(index, 1);

      if (activeTabId.value === tabId) {
        activeTabId.value =
          tabs.value.length > 0 ? tabs.value[Math.max(0, index - 1)].id : null;
      }
    }
  };

  const setActiveTab = (tabId: string) => {
    activeTabId.value = tabId;
  };

  const updateTabContent = (tabId: string, content: string) => {
    const tab = tabs.value.find((t) => t.id === tabId);
    if (tab) {
      tab.content = content;
      tab.isDirty = true;
    }
  };

  const openFileInTab = async (filePath: string, content: string) => {
    const fileName = filePath.split(/[\\/]/).pop() || "Новый файл";

    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: fileName,
      content,
      filePath,
      isDirty: false,
    };

    tabs.value.push(newTab);
    activeTabId.value = newTab.id;
  };

  return {
    tabs,
    activeTabId,
    addNewTab,
    closeTab,
    setActiveTab,
    updateTabContent,
    openFileInTab,
  };
});
