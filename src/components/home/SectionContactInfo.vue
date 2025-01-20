<script setup>
import VSectionTitle from '@/components/atoms/VSectionTitle.vue';
</script>


<template>
  <section class="section-contact-info mt-10 hidden print:block">
    <v-section-title element="h3">Contact Info</v-section-title>

    <div class="grid grid-cols-2 gap-2">
      <p class="flex flex-col">
        <strong>Email: </strong> 
        <a class="text-blue-600 hover:underline" href="mailto:hello@ibrahimturan.com">hello@ibrahimturan.com</a>
      </p>
      <p class="flex flex-col">
        <strong>Phone: </strong> 
        <a class="text-blue-600 hover:underline" href="tel:+905317959686">+90 531 795 9686</a>
      </p>
      <p class="flex flex-col">
        <strong>GitHub: </strong> 
        <a class="text-blue-600 hover:underline" href="https://github.com/turanibrahim">https://github.com/turanibrahim</a>
      </p>
      <p class="flex flex-col">
        <strong>Website: </strong> 
        <a class="text-blue-600 hover:underline" href="https://ibrahimturan.com">https://ibrahimturan.com</a>
      </p>
      <p class="flex flex-col">
        <strong>LinkedIn: </strong> 
        <a class="text-blue-600 hover:underline" href="https://www.linkedin.com/in/ibrahimturann/">https://www.linkedin.com/in/ibrahimturann/</a>
      </p>
    </div>
  </section>
</template>