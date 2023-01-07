<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, default: null },
  company: { type: String, default: null },
  companyLogo: { type: String, default: null },
  location: { type: String, default: null },
  description: { type: String, default: null },
  startDate: { type: [String, Date], default: null },
  endDate: { type: [String, Date], default: null },
});

const endDateLabel = computed(() => (
  props.endDate || 'Present'
));
</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="flex gap-4">
      <div class="hidden md:block basis-auto shrink-0">
        <img
          class="rounded-xl w-20 h-20"
          :src="props.companyLogo"
          :alt="`${props.company} company logo`"
        >
      </div>

      <div class="basis-auto">
        <div class="flex gap-4">
          <img
            class="block md:hidden rounded-xl w-20 h-20"
            :src="props.companyLogo"
            :alt="`${props.company} company logo`"
          >

          <div>
            <h4 class="font-bold text-xl">
              {{ props.title }}
            </h4>
            <div class="text-lg mb-1">
              {{ props.company }}
            </div>
            <div class="text-sm text-gray-600">
              {{ props.startDate }} - {{ endDateLabel }}
            </div>
          </div>
        </div>

        <div v-if="props.description" class="mt-3" v-html="description" />

        <div class="text-gray-600 mt-3">
          {{ props.location }}
        </div>
      </div>
    </div>
  </div>
</template>
