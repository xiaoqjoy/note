<template>
  <div class="item-div">
    {{params.context}}
  </div>
</template>

<script>
export default {
  name: 'Qitem',
  props: ['params'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: (props) => props.params.id
};
</script>

<style>
</style>
