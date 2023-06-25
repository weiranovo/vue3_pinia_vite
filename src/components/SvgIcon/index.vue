<template>
    <svg :style="{ height, width }">
        <use :xlink:href="`#icon-${name}`" :fill="color"></use>
    </svg>
</template>
  
<script setup lang="ts">
defineProps({
    name: {
        type: String
    },
    color: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
})

</script>
  
<style></style>