<template>
  <v-row v-if="selectedClocks.length > 0">
    <v-col
      v-for="(clock, index) in clocks"
      v-bind:key="clock"
      sm="12"
      md="6"
      lg="4"
    >
      <v-card
        :loading="loading"
        class="mx-auto my-1 clock-card elevation-10"
        min-width="300px"
      >
        <v-card-title
          class="d-flex justify-space-between text-subtitle-1 font-weight-bold"
        >
          {{ clock.timezone }}
          <v-icon
            @click="removeClock(index)"
            icon="mdi-close"
            size="20"
            color="grey"
            class="my-2"
          ></v-icon
        ></v-card-title>

        <v-card-text class="py-3">
          <v-row no-gutters>
            <v-col cols="8" class="text-left">
              <h2 class="text-h2">
                {{ formatDate(clock.datetime, "HH:mm A", clock.timezone) }}
              </h2>
              <h6 class="text-h6">
                <span class="text-subtitle-1 font-weight-regular">{{
                  formatDate(clock.datetime, "YYYY/MM/DD", clock.timezone)
                }}</span>
              </h6>
            </v-col>

            <v-col cols="4" class="text-right">
              <v-icon
                color="black-darken-4"
                icon="mdi-clock-check-outline"
                size="40"
              ></v-icon>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-text class="text-caption text-grey text-left"
          >Provided by
          <a href="https://worldtimeapi.org/" target="_blank" class="text-black"
            >World Time API</a
          ></v-card-text
        >
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else class="text-white text-center">
    <v-col>
      <v-alert
        type="info"
        color="white"
        title="Select a time zone to show the local time"
        variant="tonal"
      ></v-alert>
    </v-col>
  </v-row>
</template>
  
<script>
import { defineComponent } from "vue";
import { mapActions, mapState, mapMutations } from "vuex";

import moment from "moment-timezone";

export default defineComponent({
  name: "SearchResults",
  data() {
    return {};
  },
  computed: {
    ...mapState("timezones", ["timezones", "clocks", "loading"]),
    selectedClocks() {
      return this.clocks;
    },
  },
  methods: {
    ...mapActions("timezones", ["loadTimezones", "getLocalTime"]),
    ...mapMutations("timezones", ["deleteClock"]),

    formatDate(date, format, timezone) {
      return moment.tz(date, timezone).format(format);
    },

    removeClock(index) {
      this.$emit("removeTimezone", index);
    },
  },
});
</script>

<style scoped>
.clock-card {
  border-radius: 20px;
}
</style>
  