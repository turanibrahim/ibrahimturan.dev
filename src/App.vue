<template>
  <div class="default-layout">
    <router-view />
  </div>
</template>

<style lang="scss">
.default-layout {
  @apply text-gray-800 min-h-screen bg-accent-50;

  scrollbar-color: #C3D0DF transparent;
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #C3D0DF;
  }
}
</style>
