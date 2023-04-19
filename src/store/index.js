import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';

export default createStore ({
  state: {
    reservationToken: null,

    concerts: [],

    artists: [],
    shows: [],

    filteredConcerts: [],
    notFounded: false,

    showid: 0,
    seats: [],
    selectedSeats: {
      "reservations": [],
    },
    time: 180,  // 3 minutes

    field: {
      name: '',
      address: '',
      zip: '',
      city: '',
      location: '',
    },

    tickets: [],
    isConcertsLoading: false,
  },
  getters: {
    timer: (state) => {
      let min = Math.floor(state.time / 60);
      let sec = state.time % 60;
      sec = sec < 10 ? "0" + sec : sec;
      state.time--;
      return `${min}:${sec}`;
    },

    filteredConcerts: (state) => (filter) => {
      
      return function () {
        let date = filter.date.substring(0, 10).split('-').reverse().join('-');
        state.filteredConcerts = []; // 100% must have at this place



        state.concerts.forEach(itemA => (itemA.artist === filter.artist) ? state.filteredConcerts.push(itemA) : true)
        
        state.concerts.forEach(itemL => (itemL.location.name === filter.location) ? state.filteredConcerts.push(itemL) : true)

        state.concerts.forEach(itemS => itemS['shows']
        .forEach(show => 
          (show.start
            .substring(0, 10)
            .split('-')
            .reverse()
            .join('-') === date) ?
            (state.filteredConcerts.push(itemS)) : true));
        

            (state.filteredConcerts.length) ? state.notFounded = false : state.notFounded = true;
      }
      
    }
  },
  mutations: {
    setConcerts(state, concerts) {
      state.concerts = concerts;
    },
    setLoading(state, bool) {
      state.isConcertsLoading = bool;
    },
    setShows(state,concert) {
      state.shows = concert;
    },
    setArtists(state, artists) {
      state.artists = artists;
    },
    setSeats(state, seats) {
      state.seats = seats;
    },
    setTime(state, time) {
      state.time = time
    },
  },
  actions: {
    timeUpdate ({commit}) {
      commit('setTime', this.state.time--)
    },
    async fetchConcerts({commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get(`https://apic.polytech.kz/api/v1/concerts`);
        commit('setConcerts', response.data.concerts);

        let tempArtists = [];
        for (let i = 0; i < response.data.concerts.length; i++) {
          tempArtists.push(response.data.concerts[i].artist)
        }
        commit('setArtists', tempArtists);

        console.log("Done.");
      }
      catch (error) {
        console.log(error);
      }
      finally {
        commit('setLoading', false);
      }
    },

    async fetchShows({commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get(`https://apic.polytech.kz/api/v1/concerts/${router.currentRoute.value.params.concertId}`);
        commit('setShows', response.data.concert);
        console.log(response.data)
        console.log("Done.");
      }
      catch (error) {
        console.log(error);
      }
      finally {
        commit('setLoading', false);
      }
    },
    
    async fetchSeats({commit}) {
      try {
        commit('setLoading', true);
        const response = await axios
        .get(`https://apic.polytech.kz/api/v1/concerts/${router.currentRoute.value.params.concertId}/shows/${router.currentRoute.value.params.showId}/seating`);
        commit('setSeats', response.data.rows);
        console.log(response.data.reservation_token)
        console.log("Done.");
      }
      catch (error) {
        console.log(error);
      }
      finally {
        commit('setLoading', false);
      }
    },

    async enterBooked({commit}) {
      try {
        const response = await axios
        .post(`https://apic.polytech.kz/api/v1/concerts/${router.currentRoute.value.params.concertId}/shows/${router.currentRoute.value.params.showId}/reservation`, {
          "reservation_token": (this.state.reservationToken == null) ? null : this.state.reservationToken,
          "reservations" : this.state.selectedSeats.reservations,
          "duration": 300
        });
        (response.data.reservation_token !== null) ? this.state.reservationToken = response.data.reservation_token : console.log("Token is Null");
        
      }
      catch (error) {
        console.log(error);
      }
    },

    async booking({commit}) {
      try {
        console.log(this.state.field)
        const response = await axios
        .post(`https://apic.polytech.kz/api/v1/concerts/${router.currentRoute.value.params.concertId}/shows/${router.currentRoute.value.params.showId}/booking`, 
        {
          "reservation_token": this.state.reservationToken,
          "name": this.state.field.name,
          "address": this.state.field.address,
          "city": this.state.field.city,
          "zip": this.state.field.zip,
          "country": this.state.field.location
        });
        let existingTickets = [];
        let localTickets = localStorage.getItem('tickets');
        if (localTickets == null || '') {
          existingTickets = []
          for (let i = 0; i < response.data.tickets.length; i++) {
            existingTickets.push(response.data.tickets[i])
          }
        }
        else {
          JSON.parse(localTickets)
          existingTickets = localTickets;
          for (let i = 0; i < response.data.tickets.length; i++) {
            existingTickets.push(response.data.tickets[i])
          }
        }
        localStorage.setItem('tickets', JSON.stringify(existingTickets))
        console.log(response);
        console.log(localStorage.getItem('tickets'));
        router.push('/tickets')

      }
      catch (error) {
        console.log(error);
      }
      
    }
  }
})
