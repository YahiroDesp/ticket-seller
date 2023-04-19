<template>
    <NavBar></NavBar>
    <div class="container" v-if="!$store.state.isConcertsLoading">
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

        <div class="seats-container">
            <div class="stage">
                <span class="stage-title">Stage</span>
            </div>

            <div class="seats-body">
                <div class="seats-row">
                    <p v-for="row of $store.state.seats" class="seats-name">{{row.name}}<br></p>
                </div>
                <div class="checkbox-container">
                    <form id="checkbox-form">
                        <div class="checkbox-row" v-for="(row, index) of $store.state.seats" :key="row.id">
                        <template v-for="checkbox in row.seats.total">
                            <template v-if="isUnavailable(checkbox, index)">
                                <input
                                @change="unavailable()"
                                :value="checkbox" 
                                class="round-checkbox unavailable" 
                                type="checkbox"
                                >   
                            </template>
                            <template v-else>
                                <input
                                @change="available(index + 1, checkbox)"
                                :value="checkbox" 
                                class="round-checkbox" 
                                type="checkbox"
                                >  
                            </template>
                        </template>
                        </div>   
                    </form>
                </div>
            </div>
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

                <button class="seats-btn info" @click="enterBooking">Enter Booking<br>Details</button>
            </template>
            <NotFound v-else></NotFound>

        </div>


    <Modal ref="modalName">
      <template v-slot:header>
        <h1 class="modal__text">This seat unavailable!</h1>
      </template>

      <template v-slot:body>
        <p class="modal__text">You can choose only <span style="color: lime;">green</span> seats.</p>
      </template>

      <template v-slot:footer>
        <div class="d-flex align-items-center justify-content-between">
          <button class="modal__btn info" @click="$refs.modalName.closeModal()">
            <span class="modal__btn__text">Okay</span>
        </button>
        </div>
      </template>
    </Modal>

    <ModalTimeout ref="modalTimeout">
        <template v-slot:header>
        <h1 class="modal__text">The time is Out!</h1>
      </template>

      <template v-slot:body>
        <p class="modal__text">Your seat expired...</p>
      </template>

      <template v-slot:footer>
        <div class="d-flex align-items-center justify-content-between">
          <button class="modal__btn info" @click="$refs.modalTimeout.closeModal()">
            <span class="modal__btn__text">Okay</span>
        </button>
        </div>
      </template>
    </ModalTimeout>

    </div>
    <Loading v-else></Loading>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Loading from '@/components/Loading.vue';
import Modal from '@/components/Modal.vue';
import NotFound from '@/components/NotFound.vue';
import ModalTimeout from '@/components/ModalTimeout.vue';

import { mapActions } from 'vuex';


export default {
    data() {
        return {

        };
    },
    components: {
        NavBar,
        Loading,
        Modal,
        NotFound,
        ModalTimeout
    },
    methods: {
        enterBooking () {
            this.enterBooked();
            this.$router.push(`/concerts/${this.$route.params.concertId}/shows/${this.$route.params.showId}/booking`);
        },

        resetCheckbox() {
            document.querySelector('#checkbox-form').reset();
        },

        ...mapActions({
            fetchShows: "fetchShows",
            fetchSeats: "fetchSeats",
            timeUpdate: "timeUpdate",
            enterBooked: "enterBooked"
        }),

        unavailable() {
            this.$refs.modalName.openModal();
        },

        available(row, seat) {
            let inter = ''
            if (this.$store.state.selectedSeats.reservations.length) {
                let tmp = false;
                this.$store.state.selectedSeats.reservations.forEach((element, index) => {
                    if (element.row == row && element.seat == seat) {
                        this.$store.state.selectedSeats.reservations.splice(index, 1);
                        tmp = true;
                    }
                });
                if (!tmp) {
                        this.$store.state.selectedSeats.reservations.push({
                            row: row,
                            seat: seat
                        });
                }
            }
            else {
                this.$store.state.selectedSeats.reservations.push({
                    row: row,
                    seat: seat
                });
                inter = setInterval(() => {
                    this.$store.state.time < 0 ? 
                    (clearInterval(inter),
                    this.$store.state.selectedSeats.reservations = [],
                     (typeof(this.$refs.modalTimeout) == 'object') ? this.$refs.modalTimeout.openModal() : console.log("no timeoutModal"), this.resetCheckbox(), this.$store.state.time = 180)
                    : this.timeUpdate();
                }, 1000)
            }    
        },

        isUnavailable (num, index) {
            for (let j = 0; j < this.$store.state.seats[index].seats.unavailable.length; j++) { 
                if (num == this.$store.state.seats[index].seats.unavailable[j]) {
                    return true;
                }
            }
        },
    },
    mounted() {
        this.fetchShows();
        this.fetchSeats();
        this.$store.state.selectedSeats.showid = this.$route.params.showId;
    }
}
</script>

<style>
.title {
    color: rgb(5, 5, 5);
    margin: 20px 0;
    text-align: center;
    font-family: 'Oswald';
}  

.show-container {
    display: flex;
    flex-direction: column;
}

.show-id {
    margin: 10px 0;
    font-size: 30px;
}

.show-body {
    display: flex;
    flex-direction: column;
    color: rgb(14, 13, 13);
    font-family: 'Oswald';
    border: 5px solid #000000;
    border-radius: 12px;
    margin: 20px auto;
    width: 70%;
    justify-content: center;
    align-items: center;
}

.show-info, .show-date {
    margin: 10px 20px;
    font-size: 23px;
    text-align: center;
}
.show-line {
    width: 100%;
}

.seats-container {
    border: 1px solid #080808;
    border-radius: 20px;
}

.stage {
    position: relative;
    left: 20%;
    width: 80%;
    text-align: center;
    margin: 20px 0;
    padding: 10px 0;
    background: linear-gradient(270deg, rgb(14, 14, 14) 0%, rgb(12, 167, 74) 50%, rgb(14, 14, 14) 100%);
}

.stage-title {
    color: rgb(0, 0, 0);
    font-size: 30px;
    font-weight: 900;
    font-family: 'Raleway', sans-serif;
}

.seats-row {
    width: 20%;
    text-align: end;
}

.seats-name {
    color: rgb(2, 2, 2);
    font-size: 19.5px;
    margin-bottom: .3px;
    font-weight: 500;
    font-family: 'Righteous', cursive;
}

.round-checkbox {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0 3px;
    background-color: rgb(0, 198, 0);
    border-radius: 50%;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    filter: drop-shadow(0 0 2px rgb(0, 121, 0));
}

.round-checkbox:checked {
    background-color: rgb(27, 104, 40);
    border: 1px solid rgb(10, 10, 10);
    filter: drop-shadow(0 0 2px rgb(0, 43, 4));
}

.seats-body {
    display: flex;
    position: relative;
    /* height: 300px;                 --------------------------------MEDIA--------------------------------                 */
    justify-content: center;
    overflow-x: scroll;
    overflow-x: scroll;
}

.checkbox-row {
    display: block;
    white-space: nowrap;
}

.checkbox-container {
    flex-direction: column;
    align-items: center;
    width: 80%;
    text-align: center;
}

.unavailable, .unavailable:checked {
    background-color: red;
    border: 1px solid rgb(121, 0, 0);
    filter: drop-shadow(0 0 2px rgb(121, 0, 0));
}

.modal__text {
    color: rgb(8, 8, 8);
    font-family: 'Raleway', sans-serif;
    margin: 0 auto;
    text-align: center;
}

.modal__btn {
    width: 100%;
    border: 3px solid black;
    border-radius: 10px;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    background-color: transparent;
    padding: 7px 14px;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
}

.modal__btn__text {
    font-family: 'Raleway', sans-serif;
    font-weight: 900;
    font-size: 20px;
}

.selected-seats-container {
    margin: 20px auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 70%;
    color: rgb(12, 12, 12);
    font-family: 'Raleway', sans-serif;
    border: 3px solid #050505;
    border-radius: 12px;
}

.seats-title {
    margin: 20px 0;
}

.selected-seats-list {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
}

.selected-timer {
    margin: 10px 0;
}

.seats-btn {
    width: 75%;
    margin: 30px 0 10px 0;
    border: 3px solid black;
    border-radius: 10px;
    background-color: transparent;
    padding: 7px 14px;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
}

.info {
  border-color: #050505;
  font-size: 20px;
  font-weight: 500;
  color: #121213;
  letter-spacing: 3px;
}

.info:hover {
  background: #070707;
  color: rgb(255, 251, 251);
}
</style>