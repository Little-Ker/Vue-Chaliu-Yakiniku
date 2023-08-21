<template>
    <div class="menuView main-bg-img">
        <div class="banner bg-fit" :style="{backgroundImage:'url('+img+')'}">
            <div class="blackHide"></div>
        </div>  
        <div class="container-1440">
            <div class="title">
                <h1 class="text-center main-brow-text">經典套餐</h1>
                <p class="text-center main-brow-text">Set Meal</p>
            </div>
            <MealSwiper />
            <div id="moveFoodPos"></div>
            <div class="food">
                <div class="title">
                    <h1 class="text-center main-brow-text">精選單點</h1>
                    <p class="text-center main-brow-text">A La Carte</p>
                </div>
                <FoodList /> 
            </div>
        </div>
    </div>
</template>

<script>
import MealSwiper from '@/components/food/MealSwiper.vue'
import FoodList from '@/components/food/FoodList.vue'

export default {
  name: 'MenuView',
  components: {
    MealSwiper,
    FoodList,
  },
  data() {
    return {
      img: require('@/assets/images/banner/02.jpg'),
    }
  },
  mounted() {
    if (this.$route.query.id === undefined) return
    $('html,body').animate({ scrollTop: $('#moveFoodPos').offset().top }, 'slow')
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.menuView {
    padding-bottom: 45px;
    .banner {
        width: 100%;
        height: 200px;
        margin-bottom: 80px;
        background-position-y: 77%;
        mask: linear-gradient(#000, 90%, transparent);
    }
    .food {
        margin-top: 130px;
    }

    @media(max-width:710px){
        .title h1 {
            font-size: 32px;
        }
    }
    @media(max-width:530px){
        .title h1 {
            font-size: 28px;
        }
        .banner {
            height: 150px;
            margin-bottom: 60px;
        }
    }
}
</style>

