<script setup>
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
  <section class="section-education">
    <h1 class="font-bold text-4xl mb-5 mt-10">
      Education
    </h1>

    <div class="flex flex-col gap-10">
      <div class="flex gap-4">
        <div class="basis-auto shrink-0">
          <img
            class="rounded-xl w-20 h-20"
            src="https://ibrahimturan-cdn.s3.eu-central-1.amazonaws.com/589ab875-76bf-4659-a8a0-3431e877472f.jpeg"
            alt="Sakarya University Logo"
          >
        </div>

        <div class="basis-auto">
          <h4 class="font-bold text-xl">
            {{ userStore.education.university }}
          </h4>
          <div class="text-lg mb-1">
            {{ userStore.education.department }}
          </div>
          <div class="text-sm text-gray-600">
            {{ userStore.education.startYear }}
            -
            {{ userStore.education.endYear }}
          </div>

          <div class="text-gray-600 mt-2">
            {{ userStore.education.location }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
