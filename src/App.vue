<template>
 <div>
   <router-view/>
   <FooterGuide  v-show="$route.meta.showFooter"/>
 </div>
</template>

<script>
 import Vue from 'vue'
import FooterGuide from './components/FootreGuide/FooterGuide.vue'

export default {
  components:{
    FooterGuide
  },
  mounted(){
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
