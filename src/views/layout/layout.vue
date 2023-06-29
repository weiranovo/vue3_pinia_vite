<template>
    <div class="layout_container">
        <div class="layout_aside" :class="{fold:flag}">
            <myAside :flag="flag"></myAside>
        </div>
        <div class="layout_header" :class="{fold:flag}">
            <myTabBar v-model="flag"></myTabBar>
        </div>
        <div class="layout_main" :class="{fold:flag}">
            <myMain></myMain>
        </div>
    </div>
</template>

<script setup lang="ts">
import myAside from './components/myAside/index.vue'
import myMain from './components/myMain/index.vue'
import myTabBar from './components/myTabBar/index.vue'
import {ref} from 'vue'
let flag = ref(false)
</script>

<style scoped lang="scss">
.layout_container {
    width: 100vw;
    height: 100vh;
    .layout_aside {
        background-color: $base-menu-background;
        height: 100vh;
        width: $base-menu-width;
        color: #fff;
        transition: all .3s;
        // overflow: hidden;
        &.fold{
            width: $base-menu-min-width;
        }
    }

    .layout_header {
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        position: fixed;
        top: 0;
        left: $base-menu-width;
        transition: all .3s;
        &.fold{
            width: calc(100% - $base-menu-min-width);
            left:$base-menu-min-width;
        }
    }
    .layout_main{
        background-color: yellow;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        padding: 20px;
        box-sizing: border-box;
        overflow: auto;
        transition: all .3s;
        &.fold{
            width: calc(100% - $base-menu-min-width);
            left:$base-menu-min-width;
        }
    }
}

</style>