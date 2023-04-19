import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import ShowsList from '@/views/ShowsList.vue';
import ShowsSeating from '@/views/ShowsSeating.vue';
import Booking from '@/views/Booking.vue';
import TicketList from '@/views/TicketList.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/concerts/:concertId',
    component: ShowsList,
  },
  {
    path: '/concerts/:concertId/shows/:showId/seating',
    component: ShowsSeating
  },
  {
    path: '/concerts/:concertId/shows/:showId/booking',
    component: Booking
  },
  {
    path: '/tickets',
    component: TicketList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
