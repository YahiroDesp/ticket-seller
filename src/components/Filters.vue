<template>
    <div class="filter-container">
        <div class="filter-list">

            <select @select="artistFilter" v-model="filterOptions.artist" name="filterArtist" id="filterArtist" class="filter-body">
                <option value="" selected disabled>All Artist</option>
                <option v-for="artist of $store.state.artists" :key="artist">{{ artist }}</option>
            </select>

            <select v-model="filterOptions.location" name="filterLocation" id="filterLocation" class="filter-body">
                <option value="" selected disabled>All Location</option>
                <option v-for="location of locations">{{ location }}</option>
            </select>
            <input v-model="filterOptions.date" type="date" id="filterDate" class="filter-body" placeholder="Date">

        </div>
        <button @click="resetFilters" class="filter-reset light">Reset</button>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';

// Check Device
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    addEventListener("DOMContentLoaded", (event) => {
        const dateInput = document.querySelector('#filterDate');
        dateInput.classList.add("placeholderDate");
    })
}

export default {
    data() {
        return {
            locations: [
                "Das Orpheum",
                "Oper Graz",
                "Freilufthalle B",
            ],
            filterOptions: {
                artist: "",
                location: "",
                date: ""
            }
        }
    },
    methods: {
        resetFilters() {
            this.$store.state.filteredConcerts = [];
            this.filterOptions.artist = ""; this.filterOptions.location = ""; this.filterOptions.date = "";
            console.log("I AM BUTTON")
        }
    },
    computed: {
        ...mapGetters([
            'filteredConcerts'
        ])
    },
    watch: {
        filterOptions: {
            handler(newFilter) {
                if (this.filterOptions.artist == "" && this.filterOptions.location == "" && this.filterOptions.date == "") {
                    this.$store.state.notFounded = false;
                }
                else
                this.filteredConcerts(newFilter)();
            },
            deep: true
        }
    }
}


</script>

<style scoped>
/* change calendar color to Black */
::-webkit-calendar-picker-indicator {
    filter: invert(0);
}

.filter-list {
    display: flex;
    margin: 20px 0;
    position: relative;
    justify-content: center;
    padding: 0 100px 0 100px;
}

.filter-container select {
    font-size: 20px;
    font-family: 'Raleway', sans-serif;
    font-weight: 300;
}

.filter-container select option {
    background-color: rgb(255, 255, 255);
}

.filter-body {
    flex: 100%;
} 

.filter-body:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

#filterDate {
    font-family: 'Comfortaa', cursive;
    font-weight: 300;
    font-size: 16px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 100%;
    padding-left: 3px;
}

#filterDate, .filter-body {
    color: rgb(0, 0, 0);
    background-color: transparent;
    border: 4px solid rgb(8, 8, 8);
    height: 60px;
}

.filter-reset {
    display: block;
    margin: 0 auto;
    border: 5px solid rgb(255, 255, 255);
    border-radius: 10px;
    padding: 10px 25px;
    font-size: 16px;
    cursor: pointer;
}

.light {
  border-color: #0f0f0f;
  font-size: 20px;
  font-weight: 500;
  color: #0e0d0d;
  letter-spacing: 3px;
}

.light:hover {
  background: #161616;
  color: rgb(250, 250, 250);
}


/* This class will be activated only for Mobile devices */
.placeholderDate::before {
    widows: 100%;
    content: attr(placeholder);
    padding-left: 3px;
}

@media (max-width:620px) {
    .filter-list {
        display: flex;
        height: 200px;
        flex-direction: column;
        padding: 0 5px 0 5px;
    }

    .filter-body:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0px;
    }

    #filterDate {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 0px;
    }
}

</style>