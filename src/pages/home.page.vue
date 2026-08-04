<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';
import VAvatar from '@/components/atoms/v-avatar.vue';
import SocialLinks from '@/components/molecules/social-links.vue';
import ExperienceSection from '@/components/organisms/experience-section.vue';
import TechnologiesSection from '@/components/organisms/technologies-section.vue';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const fullName = computed(() => `${userInfo.value.name} ${userInfo.value.surname}`);
</script>

<template>
  <div class="portfolio-shell">
    <header class="container flex items-center justify-between py-6 lg:py-8">
      <a href="#home" class="font-mono text-sm font-semibold tracking-tight text-base-content">
        it<span class="text-primary">.</span>
      </a>
      <nav
        aria-label="Primary navigation"
        class="flex items-center gap-5 font-mono text-xs text-base-content-muted sm:gap-8"
      >
        <a href="#work" class="transition-colors hover:text-primary">work</a>
        <a href="#about" class="transition-colors hover:text-primary">about</a>
        <a href="#contact" class="transition-colors hover:text-primary">contact</a>
      </nav>
    </header>

    <main>
      <section id="home" class="container hero-layout py-16 sm:py-24 lg:py-32">
        <div class="hero-copy">
          <p class="mb-5 font-mono text-xs text-primary">
            {{ userInfo.title }} / {{ userInfo.location }}
          </p>
          <h1
            class="max-w-4xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.05em] text-base-content sm:text-7xl lg:text-8xl"
          >
            I turn ideas<br /><span class="text-primary">into shipped products.</span>
          </h1>
          <p class="mt-8 max-w-xl text-lg leading-relaxed text-base-content-muted sm:text-xl">
            {{ userInfo.tagline }}
          </p>
          <div class="mt-9 flex flex-wrap items-center gap-4">
            <a
              :href="`mailto:${userInfo.email}`"
              class="rounded-md bg-primary px-5 py-3 font-semibold text-primary-content transition-transform hover:-translate-y-0.5"
              >Start a conversation</a
            >
            <a
              href="#work"
              class="rounded-md border border-base-300 px-5 py-3 font-semibold text-base-content transition-colors hover:border-primary hover:text-primary"
              >See experience</a
            >
          </div>
        </div>
        <div class="hero-portrait">
          <div class="portrait-frame">
            <v-avatar
              :src="userInfo.profileImg"
              :alt="fullName"
              size="xl"
              shape="rounded"
              priority
            />
          </div>
          <div class="portrait-note font-mono text-xs text-base-content-muted">
            <span class="text-primary">●</span> open to product engineering roles
          </div>
        </div>
      </section>

      <section id="about" class="container about-strip border-y border-base-300 py-12 lg:py-16">
        <p class="max-w-3xl text-xl leading-relaxed text-base-content sm:text-2xl">
          {{ userInfo.introduction }}
        </p>
        <div class="mt-8 grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p class="font-mono text-xs text-primary">based in</p>
            <p class="mt-2 text-base-content">{{ userInfo.location }}</p>
          </div>
          <div>
            <p class="font-mono text-xs text-primary">education</p>
            <p class="mt-2 text-base-content">{{ userInfo.education.university }}</p>
            <p class="text-base-content-muted">{{ userInfo.education.department }}</p>
          </div>
          <div id="contact">
            <p class="font-mono text-xs text-primary">reach me</p>
            <p class="mt-2 text-base-content">{{ userInfo.email }}</p>
            <social-links class="mt-3" />
          </div>
        </div>
      </section>

      <section id="work" class="container py-20 lg:py-28">
        <div class="mb-12 flex items-end justify-between gap-6">
          <h2 class="text-4xl font-extrabold tracking-[-0.04em] text-base-content sm:text-5xl">
            Experience
          </h2>
          <span class="hidden font-mono text-xs text-base-content-muted sm:block">2020 → now</span>
        </div>
        <experience-section />
      </section>
      <technologies-section />
    </main>
  </div>
</template>

<style>
.hero-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.6fr);
  gap: clamp(2rem, 8vw, 9rem);
  align-items: end;
}
.hero-portrait {
  justify-self: end;
  width: 100%;
  max-width: 280px;
}
.portrait-frame {
  border: 1px solid var(--color-primary);
  padding: 0.75rem;
  transform: rotate(3deg);
  background: var(--color-base-300);
  width: 100%;
}
.portrait-frame .avatar,
.portrait-frame .avatar > div,
.portrait-frame img {
  width: 100%;
  max-width: none;
  aspect-ratio: 1;
  object-fit: cover;
  filter: saturate(0.7) contrast(1.08);
}
.portrait-note {
  margin-top: 1.25rem;
  line-height: 1.5;
}
@media (max-width: 640px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: clamp(2rem, 8vw, 5rem);
  }
  .hero-portrait {
    justify-self: start;
    max-width: 220px;
  }
}
</style>
