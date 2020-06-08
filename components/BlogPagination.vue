<template>
  <div id="about-pagination">
    <v-pagination v-model="page" :length="15" :total-visible="5"></v-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0
    }
  }
}
</script>
