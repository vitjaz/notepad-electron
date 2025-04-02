import { TabPaneName } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

interface Tab {
  id: string;
  title: string;
  name: number; // tab id from element plus
  content: string;
  filePath?: string;
  isDirty: boolean;
}

let tabIndex = 0;

export const useTabsStore = defineStore("tabs", () => {
  const tabs = ref<Tab[]>([]);
  const activeTabName = ref(0);

  const addNewTab = () => {
    const name = ++tabIndex;
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: "New file",
      content: "",
      name,
      isDirty: false,
    };

    tabs.value.push(newTab);
    activeTabName.value = newTab.name;
    return newTab;
  };

  const closeTab = (tabName: TabPaneName) => {
    const index = tabs.value.findIndex((tab) => tab.name === tabName);
    if (index !== -1) {
      tabs.value.splice(index, 1);

      if (activeTabName.value === tabName) {
        activeTabName.value =
          tabs.value.length > 0 ? tabs.value[Math.max(0, index - 1)].name : 0;
      }
    }
  };

  const setActiveTab = (tabName: number) => {
    activeTabName.value = tabName;
  };

  const updateTabContent = (tabName: number, content: string) => {
    const tab = tabs.value.find((t) => t.name === tabName);
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
      name: ++tabIndex,
      isDirty: false,
    };

    tabs.value.push(newTab);
    activeTabName.value = newTab.name;
  };

  return {
    tabs,
    activeTabName,
    addNewTab,
    closeTab,
    setActiveTab,
    updateTabContent,
    openFileInTab,
  };
});
