<template>
    <div v-if="$store.state.selectedSeats.reservations.length">
        <NavBar></NavBar>
        <div class="container">
            <h1 class="title">Book seats for your show</h1>

            <div class="show-container">
                <div class="show-body">
                    <template v-for="show of $store.state.shows['shows']" :key="show.id">
                        <template v-if="show.id == this.$route.params.showId">
                            <span class="show-id">Show ID: №{{ show.id }}</span>
                            <hr class="show-line">
                            <p class="show-info">
                                Artist: {{ $store.state.shows.artist }}<br>
                                Location: {{ $store.state.shows.location.name }}
                            </p>
                            <hr class="show-line">

                            <p class="show-date">
                                Start at: Time: [{{ show.start.substring(11,16) }}] | Date: [{{ show.start.substring(0, 10).split('-').reverse().join('-') }}] <br>
                                End at: Time: [{{ show.end.substring(11,16) }}] | Date: [{{ show.end.substring(0, 10).split('-').reverse().join('-') }}]
                            </p>
                        </template>
                    </template>
                </div>
            </div>

            <div class="form-container selected-seats-container">
                <h1 class="seats-title">Please enter your details</h1>
                <span class="form-text">Name</span>
                <input type="text" class="form-input" v-model="field.name">

                <span class="form-text">Address</span>
                <input type="text" class="form-input" v-model="field.address">

                <div class="address">
                    <div class="zip-cont">
                        <span class="form-text">Zip Code</span>
                        <input type="text" class="form-input zip" v-model="field.zip">
                    </div>
                    <div class="city-cont">
                        <span class="form-text">City</span>
                        <input type="text" class="form-input city" v-model="field.city">
                    </div>
                </div>    

                <select name="" class="form-input" v-model="field.location">
                    <option value="" selected disabled>Location</option>
                    <option v-for="location of this.locations">{{ location }}</option>
                </select>
                
                <span class="alert">{{ alertError }}</span>
                <button @click="checkForm" class="seats-btn info">Book</button>
            </div>

            <div class="selected-seats-container">
            <h1 class="seats-title">Selected seats</h1>

            <template v-if="$store.state.selectedSeats.reservations.length">
                <div class="selected-seats-list">
                    <span v-for="seat of $store.state.selectedSeats.reservations">Row: {{ seat.row }}, Seat: {{ seat.seat }}<br></span>
                </div>

                <hr class="show-line">
                <div class="selected-timer">
                    <span>Your seats expire in: {{ $store.getters.timer }}</span>
                </div>
                <hr class="show-line">

                <RouterLink class="seats-btn info" :to="`/concerts/${this.$route.params.concertId}/shows/${this.$route.params.showId}/seating`">Change Seating</RouterLink>
            </template>
        </div>

        </div>
    </div>

    <div v-else>
        <NavBar></NavBar>
        <div class="container">
            <h1 class="title">The time is Out!</h1>
            <h3 class="title">Your seat expired...</h3>
            <div class="show-body">
                <router-link class="seats-btn info errore" :to="`/concerts/${this.$route.params.concertId}/shows/${this.$route.params.showId}/seating`">Go Back</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            locations: [
                "Albania",
                "Andorra",
                "Armenia",
                "Austria",
                "Azerbaijan",
                "Belarus",
                "Belgium",
                "Bosnia and Herzegovina",
                "Bulgaria",
                "Croatia",
                "Cyprus",
                "Czech Republic",
                "Denmark",
                "Estonia",
                "Finland",
                "France",
                "Georgia",
                "Germany",
                "Greece",
                "Hungary",
                "Iceland",
                "Italy",
                "Kazakhstan",
                "Kosovo",
                "Latvia",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Malta",
                "Moldova",
                "Monaco",
                "Montenegro",
                "Netherlands",
                "North Macedonia",
                "Norway",
                "Poland",
                "Portugal",
                "Romania",
                "Russia",
                "San Marino",
                "Serbia",
                "Slovakia",
                "Spain",
                "Swedenm",
                "Switzerland",
                "Turkey",
                "Ukraine",
                "United",
                "Vatican City",
            ],
                field: {
                    name: '',
                    address: '',
                    zip: '',
                    city: '',
                    location: '',
                },
            alertError: ''
        }
    },
    methods: {

        ...mapActions({
            booking: "booking"
        }),

        checkForm () {
            if (this.field.name == '' || this.field.address == '' || this.field.zip == '' || this.field.city == '' || this.field.location == '') {
                this.alertError = "Введите все поля"
            }
            else {
                this.$store.state.field = this.field;
                this.booking();
                console.log("correct")
            }
        }
    },
    components: {
        NavBar,
    }
}
</script>

<style>
    .form-input {
        /* color: white;
        width: 80%;
        background-color: transparent;
        background-clip: padding-box;
        line-height: 1.5;
        border: 4px soild white;
        font-family: 'Raleway', sans-serif; */
        display: block;
        width: 70%;
        height: calc(2.25rem + 2px);
        padding: 0.375rem 0.75rem;
        margin: 0 0 50px 0;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #bdbdbd;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .zip {
        width: 100%;
    }
    .city {
        width: 100%;
    }

    .zip-cont {
        width: 20%;
    }
    .city-cont {
        width: 60%;
    }

    .address {
        display: flex;
        margin: 0 auto;
        width: 80%;
        justify-content: space-around;
    }
    .alert {
        color: red;
        font-size: 20px;
        font-weight: bolder;
    }
</style>