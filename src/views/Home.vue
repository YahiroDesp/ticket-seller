<template>

    <NavBar></NavBar>
    <div class="container">
      <MainTitle></MainTitle>
      <Filters></Filters>
      <ConcertList v-if="!$store.state.isConcertsLoading && !$store.state.notFounded"></ConcertList>
      <NotFound v-else-if="$store.state.notFounded"></NotFound>
      <Loading v-else></Loading>
    </div>

</template>

<script>
import MainTitle from "@/components/MainTitle.vue";
import ConcertList from "@/components/ConcertList.vue";
import NavBar from "@/components/NavBar.vue";
import Filters from "@/components/Filters.vue";
import Loading from "@/components/Loading.vue";
import NotFound from "@/components/NotFound.vue";

import { mapActions } from "vuex";


export default {
    components: {
    ConcertList,
    NavBar,
    Filters,
    MainTitle,
    Loading,
    NotFound
  },
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions({
      fetchConcerts: "fetchConcerts"
    })
  },
  mounted() {
    this.fetchConcerts()
  },
}

</script>

<style>

body {
  background-color: rgb(255, 255, 255);
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 10px;
}

</style>