<script setup lang="ts">
defineSlots<{
  start: () => any;
  center: () => any;
  end: () => any;
}>();
</script>

<template>
  <div class="navbar">
    <div class="navbar-start">
      <slot name="start"></slot>
    </div>
    <div class="navbar-center">
      <slot name="center"></slot>
    </div>
    <div class="navbar-end">
      <slot name="end"></slot>
    </div>
  </div>
</template>
