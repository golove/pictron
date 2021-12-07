<template>
    <div class="actool">
        <svg @click.stop="newest">
            <use xlink:href="#heart" />
        </svg>
        <svg>
            <use xlink:href="#star" />
        </svg>
        <svg>
            <use xlink:href="#check_circle" />
        </svg>
        <svg>
            <use xlink:href="#trash" />
        </svg>
    </div>
</template>
<script lang='ts' setup>
// import { ipcRenderer } from 'electron'
import { useRoute } from 'vue-router'
const route = useRoute()
function newest () {
  console.log(route)
  //   ipcRenderer.send('newest', route.name)
}

</script>
<style>
.actool {
    -webkit-app-region: drag;
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    width: 300px;
    height: 50px;
    margin: 0 auto;
    border-radius: 18px;
    /* background-color:red; */
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(12px);
    display: flex;
    justify-content: space-around;
    align-items: center;
}
svg {
    cursor: pointer;
    margin-right: 1rem;
    -webkit-app-region: no-drag;
    fill: rgb(255, 0, 106);
    width: 30px;
    height: 30px;
}
</style>
