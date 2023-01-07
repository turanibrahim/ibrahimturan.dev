<script setup>
import CardExperience from '@/components/home/CardExperience.vue';
</script>

<template>
  <div class="section-experience">
    <h1 class="font-bold text-4xl mb-5 mt-10">
      Experience
    </h1>

    <card-experience
      class="mt-10"
      title="Frontend Developer"
      company="Hub21"
      company-logo="https://ibrahimturan-cdn.s3.eu-central-1.amazonaws.com/e8cd7708-5f71-4010-8ec4-c2a404f72b0b.jpeg"
      start-date="2021-01-06T21:00:00.000Z"
      location="London, England, United Kingdom"
    />

    <card-experience
      class="mt-10"
      title="Frontend Developer"
      company="Vivense"
      company-logo="https://ibrahimturan-cdn.s3.eu-central-1.amazonaws.com/83edda06-9f6e-42bd-ac14-0b886ad094eb.jpeg"
      start-date="2021-01-05T21:00:00.000Z"
      end-date="2022-01-04T21:00:00.000Z"
      location="Istanbul, Turkey"
      description="- Made contributions Vivense e-commerce websites and internal ERP project written with Vue.js.<br>- Mostly worked on Basket, Checkout, Accounting, Order and Customer services.<br>- Gained experience about working with different professions that related to software development process and being part of distributed systems.<br>- Lastly became familiar with remote work, agile methodologies, responsive design and UX best practices."
    />

    <card-experience
      class="mt-10"
      title="Frontend Developer"
      company="reybex Cloud ERP"
      company-logo="https://ibrahimturan-cdn.s3.eu-central-1.amazonaws.com/e415df9b-4c7c-4cfb-a057-709a70e3ba4f.jpeg"
      start-date="2020-01-01T12:00:00.000Z"
      end-date="2020-01-03T12:00:00.000Z"
      location="Sakarya, Turkey"
      description="- Developed reybex Mobile, reybex Hand Terminal, reybex B2B Shop projects from the ground up. Also made contributions to main project reybex. Besides responsible for reybex Sales Person mobile app.<br>- Used javascript frameworks like Nuxt.js, Vue.js, React-Native, Feathers.js, Socket.io.<br>- As a summary of reybex adventure, developed three projects on the ground up and contributed other reybex projects. Reviewed almost 250 MR's and made about 2.5k contributions to all of reybex internal projects in one year."
    />

    <card-experience
      class="mt-10"
      title="Fullstack Intern"
      company="BGS Bireysel Gelişim İnteraktif Sis. A.Ş"
      company-logo="https://ibrahimturan-cdn.s3.eu-central-1.amazonaws.com/66efee14-68bc-4715-a55e-776ddaeffb9e.png"
      start-date="2020-01-01T12:00:00.000Z"
      end-date="2020-01-03T12:00:00.000Z"
      location="Sakarya, Turkey"
      description="- Worked on the main project named EYSIS. This project based on Phalcon PHP Framework, MySQL database on the backend side and Vue, Vuetify on the client side.<br>- Integrated all active development process into Docker. Besides that, worked on Linux computers, gained experience on git."
    />
  </div>
</template>
