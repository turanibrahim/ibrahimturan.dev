<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: null },
  size: { type: String, default: null },
  type: { type: String, default: 'button' },
  theme: { type: String, default: 'primary' },
  icon: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  href: { type: String, default: null },
  to: { type: [String, Object], default: null },
});

const element = computed(() => {
  if (props.href) {
    return 'a';
  } if (props.to) {
    return 'router-link';
  }

  return 'button';
});
const buttonClass = computed(() => ({
  btn: 'true',
  [`btn-${props.theme}`]: !props.variant !== 'outline',
  [`btn-outline-${props.theme}`]: props.variant === 'outline',
  'btn-pill': props.variant === 'pill',
  'btn-icon': props.variant === 'icon',
  'w-100': props.block,
}));
</script>

<template>
  <component
    :is="element"
    :class="buttonClass"
    :disabled="props.disabled"
    :type="props.type"
    :href="props.href"
    :to="props.to"
  >
    <slot />
  </component>
</template>

<style lang="scss">
@import "src/assets/styles/ui/button";
</style>
