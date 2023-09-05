<template>
  <v-row class="d-flex justify-center mb-6">
    <v-col sm="12" md="6">
      <v-autocomplete
        label="Select a timezone"
        variant="solo-filled"
        multiple
        :loading="loading"
        v-model="selected"
        :items="timezones"
        @update:model-value="updateTimezones(selected)"
      >
        <template v-slot:selection="{ item, index }">
          <h4 v-if="index < 1">
            <span>{{ item.title }}</span>
          </h4>
          <span v-if="index === 1" class="text-black text-caption ml-2">
            + {{ selected.length - 1 }} selection(s)
          </span>
        </template></v-autocomplete
      >
    </v-col>
  </v-row>

  <SearchResults @remove-timezone="removeClock()"></SearchResults>
</template>
  
  <script>
import { defineComponent } from "vue";
import { mapActions, mapState, mapMutations } from "vuex";

import moment from "moment-timezone";
import SearchResults from "../components/SearchResults.vue";

export default defineComponent({
  name: "Search",
  components: { SearchResults },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    ...mapState("timezones", ["timezones", "clocks", "loading"]),
    selectedClocks() {
      return this.clocks;
    },
  },
  methods: {
    ...mapActions("timezones", ["loadTimezones", "getLocalTime"]),
    ...mapMutations("timezones", ["setClocks", "deleteClock"]),

    async updateTimezones(timezones) {
      await this.getLocalTime(timezones);
    },

    formatDate(date, format, timezone) {
      return moment.tz(date, timezone).format(format);
    },

    removeClock(index) {
      this.selected?.splice(index, 1);
      this.deleteClock(index);
    },

    isUpdateRequired() {
      if (this.selectedClocks.length > 0) {
        let clientMinutes = moment().format("mm");
        let clockMinutes = this.selectedClocks[0].datetime
          ? this.selectedClocks[0].datetime.substring(14, 16)
          : null;

        return clientMinutes != clockMinutes ? true : false;
      } else return false;
    },
  },

  watch: {
    selected(newValue) {
      setInterval(() => {
        if (this.isUpdateRequired()) {
          this.updateTimezones(this.selected);
        }
      }, 5000);
    },
  },

  mounted() {
    this.loadTimezones();
  },
});
</script>

<style scoped>
.clock-card {
  border-radius: 10px;
}
</style>
  
