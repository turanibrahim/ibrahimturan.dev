<template>
  <div id="blog-post">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col class="d-flex child-flex" cols="12">
          <v-card flat tile class="d-flex">
            <v-img
              :src="
                `https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`
              "
              :lazy-src="
                `https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`
              "
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
        <v-col>
          <v-container fluid class="pa-0">
            <VueShowdown id="mark-down" class="pa-2" :markdown="deneme" />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deneme: ''
    }
  },
  created() {
    const client = new XMLHttpRequest()
    client.open('GET', '/deneme.md')
    const self = this
    client.onreadystatechange = function() {
      self.deneme = client.responseText
    }
    client.send()
  }
}
</script>
<style>
#mark-down {
  font-family: 'Open Sans', sans-serif;
}
#mark-down p img {
  width: 100%;
  border-radius: 4px;
}
#mark-down code {
  font-family: 'Fira Code', monospace;
}
#mark-down pre code {
  padding: 8px;
  width: 100%;
  margin-bottom: 8px;
}
#mark-down table {
  border-collapse: collapse;
  width: 100%;
}

#mark-down td,
#mark-down th {
  border: 1px solid #ddd;
  padding: 8px;
}

#domark-downwn tr:nth-child(even) {
  background-color: #f2f2f2;
}

#mark-down tr:hover {
  background-color: #ddd;
}

#mark-down th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #b0bec5;
  color: white;
}
</style>
