<template>
  <main class="main-layout">
    <TopNav @toggle-sidebar="showSidebar = !showSidebar" />

    <div class="main-container" :class="{ 'sidebar-show': showSidebar }">
      <SideBar :show="showSidebar" />

      <!-- Page content here, can also replace with router-view if router is implemented -->
      <div class="page-content">
        <ProfileDetails />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TopNav from '@/components/layout/TopNav.vue'
import SideBar from '@/components/layout/SideBar.vue'
import ProfileDetails from '@/views/Profile.vue'

const showSidebar = ref<boolean>(false)
provide('showSidebar', showSidebar)
</script>


<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 600px;
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  max-width: 1070px;
  margin: auto;
  height: 100%;
  padding: 20px;
}
</style>
