<template>
    <NavBar></NavBar>
    <div class="container" v-if="!$store.state.isConcertsLoading">
        <h1 class="title">Available Shows</h1>

        <div class="shows-container">

            <div class="show-item" v-for="(show, index) of $store.state.shows['shows']" :key="show.id">
                <span class="show-number">N⁰ {{ index + 1 }}</span>
                <hr class="show-line">
                <p class="show-info">
                    Artist: {{$store.state.shows.artist}} <br>
                    Location: {{$store.state.shows.location.name}}
                </p>
                <hr class="show-line">
                <p class="show-date">
                    Start at: Time: [{{ show.start.substring(11,16) }}] | Date: [{{ show.start.substring(0, 10).split('-').reverse().join('-') }}] <br>
                    End at: Time: [{{ show.end.substring(11,16) }}] | Date: [{{ show.end.substring(0, 10).split('-').reverse().join('-') }}]
                </p>
                <RouterLink class="show-btn info" :to="`/concerts/${this.$route.params.concertId}/shows/${show.id}/seating`">Book a seat</RouterLink>
            </div>

        </div>

    </div>
    <Loading v-else></Loading>
    
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Loading from '@/components/Loading.vue';

import {mapActions } from "vuex";

export default {
    data() {
        return {

        }
    },
    components: {
        NavBar,
        Loading
    },
    methods: {
        ...mapActions({
            fetchShows: "fetchShows"
        })
    },
    mounted() {
        this.fetchShows();
    },
}
</script>

<style scoped>

.title {
    color: rgb(10, 10, 10);
    margin: 20px 0;
    text-align: center;
    font-family: 'Oswald';
}

.shows-container {
    display: flex;
    flex-direction: column;
}

.show-item {
    display: flex;
    flex-direction: column;
    color: rgb(0, 0, 0);
    font-family: 'Oswald';
    border: 2px solid #000000;
    border-radius: 12px;
    margin: 10px auto;
    width: 80%;
    justify-content: center;
    align-items: center;
}
.show-number {
    font-size: 30px;
    text-decoration: underline;
    margin: 10px 0;
}

.show-info, .show-date {
    margin: 10px 20px;
    font-size: 17px;
    text-align: center;
}
.show-line {
    width: 100%;
}

.show-btn {
    width: 100%;
    border: 2px solid black;
    border-radius: 6px;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    background-color: transparent;
    padding: 7px 14px;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
}

.info {
  border-color: #0d0d0e;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  letter-spacing: 3px;
}

.info:hover {
  background: #0c0c0c;
  color: rgb(250, 249, 249);
}
</style>