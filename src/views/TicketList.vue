<template>
    <NavBar></NavBar>
    <h1 class="title">Tickets List</h1>
    <div class="container">
        <div v-if="this.$store.state.tickets.length">
            <div class="tickets-container">

                <div class="ticket" v-for="(ticket, index) of this.$store.state.tickets">
                    <h3 class="title">Ticket</h3>

                    <div class="seats-info">
                        <span class="ticket-info">Row: {{ ticket.row.name }} <br></span>
                        <span class="ticket-info">Seat: {{ ticket.row.id }} <br></span>
                    </div>

                    <div class="code-container">
                        <p class="ticket-code">Code: <strong>{{ticket.code}}</strong></p>
                    </div>

                    <div class="concert-info">
                        <div class="concert-headed">
                            <span class="ticket-seat-info">
                                Ticket purchase Date: {{ticket.created_at.substring(0, 10).split('-').reverse().join('-')}} {{ ticket.created_at.substring(11,16) }}<br>
                            </span>
                            <span class="ticket-seat-artist">Artist: {{ticket.show.concert.artist}}<br></span>
                            <span class="ticket-seat-info">Location: {{ticket.show.concert.location.name}}</span>
                        </div>
                        <div class="concert-time">
                            <span class="ticket-info">
                               Start: {{ ticket.show.start.substring(0, 10).split('-').reverse().join('-') }} - 
                               End: {{ ticket.show.end.substring(0, 10).split('-').reverse().join('-') }}
                            </span>
                        </div>
                    </div>

                    <button class="seats-btn info title" @click="cancelTicket(index)">Cancel Ticket</button>
                </div>

            </div>
        </div>
        <div v-else>
            <div class="no-tickets-container">
                <h1 class="title">You don't have tickets</h1>
                <h3 class="title">But you can Buy it!</h3>
                <router-link class="seats-btn info title" :to="'/'">Go to Concerts</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            
        }
    },
    components: {
        NavBar
    },
    methods: {
        getTicketsFromLocal() {
            let localTickets = localStorage.getItem('tickets');
            if (localTickets === '' || null) {
                console.log("null")
            }
            else
            this.$store.state.tickets = JSON.parse(localTickets);
        },
        cancelTicket(index) {
            let tempLocal = JSON.parse(localStorage.getItem('tickets'));
            if (tempLocal.length == 1) {
                console.log(tempLocal);
                console.log("LAST DELETE");
                tempLocal.splice(index, 1);
                localStorage.clear();
                this.$store.state.tickets = [];
            }
            console.log(tempLocal)
            tempLocal.splice(index, 1);
            localStorage.setItem('tickets', JSON.stringify(tempLocal))
            this.$store.state.tickets = tempLocal
        }
    },
    mounted() {
        this.getTicketsFromLocal();
    },
}

</script>

<style scoped>
.no-tickets-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tickets-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ticket {
    color: rgb(8, 8, 8);
    font-family: 'Raleway', sans-serif;
    text-align: center;
    border: 1px solid #1d1c1d;
    border-radius: 12px;
    width: 90%;
    margin: 20px 0;
}
.seats-info {
    font-size: 20px;
}
.concert-info {
    border: 1px solid #080808;
    border-radius: 12px;
    width: 70%;
    margin: 0 auto;
    padding: 20px 0;
}

.code-container {
    border: 1px solid #030303;
    border-radius: 12px;
    width: 70%;
    margin: 20px auto;
    padding: 20px 0;
}
.ticket-seat-info {
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
}

.ticket-seat-artist {
    font-size: 25px;
}

.ticket-code {
    font-family: 'Righteous', cursive;
    letter-spacing: 2px;
}

.concert-time {
    font-size: 20px;
    margin-top: 50px;
}
</style>