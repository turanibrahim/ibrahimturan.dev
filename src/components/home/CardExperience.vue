<script setup>
import { computed } from 'vue';
import { format, formatDistance } from 'date-fns';

const props = defineProps({
  title: { type: String, default: null },
  company: { type: String, default: null },
  companyLogo: { type: String, default: null },
  location: { type: String, default: null },
  description: { type: String, default: null },
  startDate: { type: [String, Date], default: null },
  endDate: { type: [String, Date], default: null },
});

const duration = computed(() => {
  if (props.endDate) {
    return formatDistance(new Date(props.endDate), new Date(props.startDate));
  }

  return formatDistance(new Date(), new Date(props.startDate));
});
const formattedDate = (date) => format(new Date(date), 'MMM yyyy');
const endDateLabel = computed(() => (
  props.endDate ? formattedDate(props.endDate) : 'Present'
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
            <div class="text-sm text-gray-600 capitalize">
              {{ formattedDate(props.startDate) }}
              -
              {{ endDateLabel }} | {{ duration }}
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
