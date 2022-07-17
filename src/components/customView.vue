<script setup lang='ts'>
 const props = defineProps({ 
  style: {
    type: String
  }, 
})
// const {style} = toRefs(props)
console.log();

console.log(props.style);

// console.log(style);

</script>


<template>
    <view :style="style">
        <slot></slot>
    </view>
</template>


<style>

</style>