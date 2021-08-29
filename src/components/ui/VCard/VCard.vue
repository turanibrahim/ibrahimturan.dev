<template>
  <div class="v-card">
    <div v-if="$slots.title" class="v-card__title">
      <slot name="title">
        <h3>{{ title }}</h3>
      </slot>
    </div>

    <div class="v-card__content">
      <slot></slot>
    </div>

    <div v-if="$slots.action" class="v-card__actions">
      <slot name="actions">
        <button>Action</button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VCard',
  props: {
    height: {
      type: String,
      default: '300px',
    },
    width: {
      type: String,
      default: '300px',
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang='scss'>
@import './VCard';

.v-card {
  --v-card-height: v-bind(height);
  --v-card-width: v-bind(width);
}
</style>
