<template>
    <div class="layout_container">
        <div class="layout_aside">
            <myAside></myAside>
        </div>
        <div class="layout_header">Header</div>
        <div class="layout_main">
            <myMain></myMain>
        </div>
    </div>
</template>

<script setup lang="ts">
import myAside from './components/myAside/index.vue'
import myMain from './components/myMain/index.vue'
</script>

<style scoped lang="scss">
.layout_container {
    width: 100vw;
    height: 100vh;

    .layout_aside {
        background-color: $base-menu-background;
        height: 100vh;
        width: $base-menu-width;
        // overflow: hidden;
    }

    .layout_header {
        background-color: red;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        position: fixed;
        top: 0;
        left: $base-menu-width;
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
    }
}

</style>