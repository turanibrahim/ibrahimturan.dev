<script setup>
import VAvatar from '@/components/ui/VAvatar.vue';
import VButton from '@/components/ui/VButton.vue';
import VLinkedinIcon from '@/components/atoms/VLinkedinIcon.vue';
import VTwitterIcon from '@/components/atoms/VTwitterIcon.vue';
import VDevtoIcon from '@/components/atoms/VDevtoIcon.vue';
import { LinkIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/vue/20/solid';
</script>

<template>
  <div class="section-sidebar">
    <div class="flex justify-center text-center">
      <v-avatar
        alt="Profile Image"
        src="https://ibrahimturan-cdn.s3.eu-central-1.amazonaws.com/4d99c629-bdf3-48a9-88aa-616e2a35522f.png"
        width="200"
      />
    </div>

    <h1 class="text-3xl xl:text-4xl font-bold mt-7 text-primary">
      Ibrahim Turan
    </h1>
    <h2 class="text-xl xl:text-2xl font-semibold mt-2 text-primary-500">
      Software Engineer
    </h2>

    <div class="mt-8">
      <div>
        <h3 class="text-primary font-bold text-lg mb-2">
          Company
        </h3>

        <a href="https://thehub21.com/" target="_blank">
          <img
            class="h-5"
            src="https://cdn.thehub21.com/logo-v2.png"
            alt="hub21 logo"
            height="25"
          >
        </a>
      </div>
      <div class="mt-5">
        <h3 class="text-primary font-bold text-lg">
          Social Media
        </h3>

        <div class="flex mt-1 gap-2">
          <v-button
            href="https://www.linkedin.com/in/ibrahimturann/"
            variant="icon"
            target="_blank"
          >
            <v-linkedin-icon height="25" width="25" />
          </v-button>

          <v-button
            href="https://twitter.com/_ibrahimturan"
            variant="icon"
            target="_blank"
          >
            <v-twitter-icon height="25" width="25" />
          </v-button>

          <v-button
            href="https://dev.to/_ibrahimturan"
            variant="icon"
            target="_blank"
          >
            <v-devto-icon height="25" width="25" />
          </v-button>
        </div>
      </div>
      <div class="mt-1">
        <h3 class="text-primary font-bold text-lg">
          Email
        </h3>

        <span class="inline-flex gap-2 items-center">
          <envelope-icon class="h4 w-4" />

          <a href="mailto:hello@ibrahimturan.com">
            hello@ibrahimturan.com
          </a>
        </span>
      </div>
      <div class="mt-3">
        <h3 class="text-primary font-bold text-lg">
          Github Profile
        </h3>

        <span class="inline-flex gap-2 items-center">
          <link-icon class="h4 w-4" />

          <a href="https://github.com/turanibrahim">
            https://github.com/turanibrahim
          </a>
        </span>
      </div>
      <div class="mt-3">
        <h3 class="text-primary font-bold text-lg">
          Location
        </h3>

        <span class="inline-flex gap-2 items-center">
          <map-pin-icon class="h4 w-4" />
          Bolu, Turkey
        </span>
      </div>
    </div>
  </div>
</template>
