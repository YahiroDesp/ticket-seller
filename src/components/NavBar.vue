<template>
   <nav>
    <ul class="nav-bar">
        <router-link :to="'/'">
            <img src="@/assets/images/logo.jpg" alt="logo" class="round">
        </router-link>
        <li>
            <div class="right-nav">
                <span class="nav-title">Already booked?</span>
                <router-link :to="'/tickets'" class="nav-btn COLOR">Get Tickets</router-link>
            </div>
        </li>
    </ul>
   </nav>

   <hr class="hr">
</template>

<script>
export default {
    
}
</script>

<style scoped>

.nav-title {
    font-size: 20px;
    margin: 0 10px 0 0;
    font-weight: 500;
    color: rgb(15, 15, 15);
}

.nav-bar {
    display: flex;
    background-color: #e6e6e6;
    justify-content: space-around;
    list-style-type: none;
    border-bottom: white;
}

ul img {
    display: block;
    width: 50px;
    height: 50px;
    margin: 5px;
}

li {
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 50px;
    padding: 0 50px;
    background-color:#fdfdfd;
}

.nav-btn {
    border: 3px solid rgb(245, 243, 243);
    border-radius: 10px;
    background-color: white;
    padding: 7px 14px;
    font-size: 16px;
    text-decoration: none;
}

.COLOR {
  border-color: #080808;
  font-size: 20px;
  font-weight: 500;
  color: #070707;
}

.COLOR:hover {
  background: #0a0a0a;
  color: rgb(236, 236, 236);
}

.round {
    border-radius: 100px;
}

.right-nav {
    display: flex;
    align-items: center;
    height: 100%;
}
.hr{
    margin: 5px;
    color:black;
    height: 10px;
}
</style>