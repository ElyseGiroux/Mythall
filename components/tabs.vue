<template>
  <div>
    <div class="sm:hidden">
      <label
        for="tabs"
        class="sr-only">
        Select a tab
      </label>
      <select
        v-model="selectedTab"
        id="tabs"
        name="tabs"
        class="w-full rounded border-2 border-primary py-2 pl-3 pr-10 text-base shadow-lg focus:border-accent focus:outline-none focus:ring-0 focus:ring-accent sm:text-sm"
        @change="$emit('updateTab', selectedTab)">
        <option
          v-for="tab of props.tabs"
          :value="tab.link">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav
          class="-mb-px flex space-x-8"
          aria-label="Tabs">
          <button
            type="button"
            v-for="tab of props.tabs"
            @click="
              selectedTab = tab.link;
              $emit('updateTab', selectedTab);
            "
            :class="[
              tab.link == selectedTab
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:border-accent hover:text-accent',
              'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
            ]">
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ tabs: Tab[]; currentTab: string }>();
const selectedTab = ref(props.currentTab);
</script>
