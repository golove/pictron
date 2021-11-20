<template>
  <tab-bar />
  <router-view />
  <svgview />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import svgview from './svg.vue'
import tabBar from './components/tabBar/index.vue'
export default defineComponent({
  name: 'App',
  components: { svgview, tabBar }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  user-select: none;
}

.loadMoreBtnStyle{
  cursor: pointer;
  width: 30vw;
  height: 4vh;
  font-size: 1.2rem;
  margin: 5px;
  color: rgb(255, 0, 106);
  border: none;
  border-radius: 8px;
  font-weight: bold;
}
.loadMoreBtnStyle:hover{
  background:rgba(255, 0, 106,1);
  color: aliceblue;
}
.btndisabledstyle{
   width: 30vw;
  height: 4vh;
  font-size: 1.2rem;
  margin: 5px;
  color: rgb(255, 0, 106);
  border: none;
  border-radius: 8px;
  font-weight: bold;
}
html::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
body::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
body {
  margin: 0;
}

@media only screen and (max-width: 450px) {
   .item {
  width: 98vw;
  margin: 0 2px;
}

}

/* Extra small devices (phones, 600px and down) */
@media only screen and (min-width: 450px) {
   .item {
  width: 48vw;
  margin: 0 2px;
}

}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .item {
  width: 48vw;
  margin: 0 2px;
}

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
   .item {
  width: 24vw;
  margin: 0 2px;
}

}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
   .item {
  width: 19.3vw;
  margin: 0 2px;
}

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .item {
  width: 16.1vw;
  margin: 0 2px;
}

}
@media only screen and (min-width: 1500px) {
    .item {
  width: 13.9vw;
  margin: 0 2px;
}

}
@media only screen and (min-width: 1800px) {
    .item {
  width: 10.8vw;
  margin: 0 2px;
}

}

</style>
