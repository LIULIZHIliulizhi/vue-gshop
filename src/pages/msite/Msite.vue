<template>
  <section class="msite">
    <!--首页头部-->
    <TopHeader  :title ="address.name">
       <span class="header_search" slot="left">
         <i class="iconfont icon-sousuo"></i>
       </span>
      <span class="header_login"slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </TopHeader>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide"v-for="(categorys,index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="imgFoods + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="loading" v-else>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import ShopList from '../../components/ShopList/ShopList.vue';

  export default {
    data(){
      return{
        imgFoods:'https://fuss10.elemecdn.com'
      }
    },
    mounted(){
      this.$store.dispatch('getShops')
      this.$store.dispatch('getFoodCategory')
      this.$store.dispatch('getAddress')
    },
    computed:{
      ...mapState(['address','categorys']),
//      将一维数组转化为二维数组
      categoryArr(){
        const {categorys} = this ;
        const arr = [];
        let smallArr = [];
        categorys.forEach(c => {
          if(smallArr.length === 0){
            arr.push(smallArr)
          }
          smallArr.push(c)
          if(smallArr.length===8){
            smallArr = []
          }
        })
        return arr
      }
    },
    watch:{
      categorys() {
        this.$nextTick(()=>{
          new Swiper( '.swiper-container',{
            loop: true,
            pagination: {
            el: '.swiper-pagination',
            },
          })
        })
      }
    },
    components:{
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>

