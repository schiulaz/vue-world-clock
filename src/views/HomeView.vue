<template>
  <div class="text-white text-center bg-clock">
    <v-icon aria-hidden="false" size="50" class="mt-6"> mdi-clock </v-icon>
    <h1 class="my-6">
      World Clock
    </h1>
   
    <v-container>
      <Search  />
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";


// Components
import Search from "../modules/timezones/components/Search.vue";

export default defineComponent({
  name: "Home",

  components: {
    Search,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
});
</script>

<style scoped>
.bg-clock {
  background-color: #000000;
  background-image: url("../assets/img/clock2.jpg");
  background-size:contain;
  min-height: 1100px;
}

</style>