<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <keep-alive include="Attr">
                <component :is="Component" v-if="flag" />
            </keep-alive>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
const store = useStore()
const flag = ref(true)
watch(() => store.state.layout.refresh, () => {
    flag.value = false
    nextTick(() => {
        flag.value = true
    })
})
</script>

<style scoped lang="scss">
.fade-enter-from {
    opacity: 0;
    transform: scale(0)
}

.fade-enter-active {
    transition: all .3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1)
}
</style>