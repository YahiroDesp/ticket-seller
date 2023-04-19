<template>
    <div class="card-list">
        <div class="card-item" 
        v-for="(concert) of $store.state.filteredConcerts.length !== 0 ? 
        $store.state.filteredConcerts :
        $store.state.concerts"
        :key="concert.id"
        >
        
            <span class="card-title"><br>{{ concert.artist }}</span>

            <p class="card-info">
                Location: {{ concert.location.name }}<br>
                <span class="card-seedling" v-for="(time, index) of concert.shows">
                    Seedling: {{ index+1 }} Time: {{time.start.substring(11,16) }} - {{ time.end.substring(11,16) }} <br>
                </span>
            </p>
            
            <div class="card-footer">
                <hr>
                <span class="card-date" v-for="(date, index) of concert.shows">
                    Date S.{{ index+1 }}: {{ date.start.substring(0, 10).split('-').reverse().join('-') }} <br>
                </span>
                <RouterLink class="card-btn info" :to="`concerts/${concert.id}`">Details</RouterLink>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        resetStore() {
            this.$store.state.selectedSeats.reservations = [];
            this.$store.state.time = 180;
        }
    },
    mounted() {
        this.resetStore();
    },
    
}
</script>

<style scoped>

.card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border-radius: 20px;
    background-color: #ffffff;
    margin: 30px 0;
    padding: 0 5px;
}

.card-item {
    color: rgb(2, 2, 2);
    display: flex;
    flex-direction: column;
    font-family: 'Oswald';
    border: 3px solid #000000;
    border-radius: 12px;
    text-align: center;
    margin: 20px 0;
    padding: 10px 0 0 0;
}

.card-title {
    font-size: 30px;
    font-weight: 500;
}

.card-seedling {
    padding: 0 20px;
    font-size: 20px;
}

.card-info {
    margin: 10px 0 60px 0;
    padding: 0 10px;
    font-size: 20px;
}

.card-btn {
    justify-content: flex-end;
    border: 3px solid rgb(8, 8, 8);
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    padding: 7px ;
    font-size: 16px;
    cursor: pointer;
}

.card-footer {
    display: flex;
    flex-direction: column;
    margin-top: auto;
}

.card-footer hr {
    color: #050505;
    background-color: #050505; 
    height: 5px; 
}

.info {
  border-color: #080808;
  font-size: 25px;
  font-weight: 500;
  color: #030303;
}

.info:hover {
  background: #030303;
  color: rgb(252, 250, 250);
}
</style>