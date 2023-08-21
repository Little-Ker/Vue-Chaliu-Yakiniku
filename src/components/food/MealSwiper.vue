<template>
    <div class="foodListSwiper pos-relative">
        <div class="w-100 pos-relative">
            <swiper
                :modules="modules"
                :loop="swiperOption.loop"
                :autoplay="swiperOption.autoplay"
                :speed="swiperOption.speed"
                :slides-per-view="swiperOption.slidesPerView"
                :space-between="swiperOption.spaceBetween"
                :breakpoints="swiperOption.breakpoints"
                @swiper="onSwiper"
            >
                <swiper-slide  v-for="(meal, index) in foodListDataMeal" :key="index">
                    <div class="food main-grayBg-img">
                        <div class="img bg-fit" :style="{backgroundImage:'url('+meal.img+')'}">
                            <div :style="{backgroundColor:`${mealTitleBgColor[index]}`}" class="title fw-700">{{meal.name}}</div>
                        </div>
                        <div class="mealData">
                            <p class="text-cenetr main-brow-text fw-700">NT.{{meal.price}} / 雙人</p>
                            <p class="food-title">主食</p>
                            <p class="txt meat main-white-333">{{meal.food}}</p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="swiper-button swiper-prev-btn" @click="prevFn">
                <i class="icon-left-open"></i>
            </div>
            <div class="swiper-button swiper-next-btn" @click="nextFn">
                <i class="icon-right-open"></i>
            </div>
            <div class="otherFood main-grayBg-img">
                <p class="fw-700">以上套餐均附</p>
                <div class="d-flex">
                    <div v-for="(side, index) in foodListDataSide" :key="index" class="other-block">
                        <p class="food-title">{{side.type}}</p>
                        <p v-for="(food, index) in side.food" :key="index" class="txt">{{food}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  Autoplay 
} from 'swiper'
import {
  Swiper, SwiperSlide 
} from 'swiper/vue'

import foodListData from '@/assets/datas/foodListData.json'
 
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay],
    }
  },
  data() {
    return {
      swiper: null,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        speed: 1000,
        breakpoints: {
          1: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          780: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          990: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        },
      },
      foodListDataMeal: foodListData.meal,
      foodListDataSide: foodListData.side,
      mealTitleBgColor: [
        '#aa8343cb', '#6b5128cb', '#C1625Dcb', '#A7372Bcb', '#2b1f14cb',
      ],
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
      // console.log(swiper);
    },
    prevFn() {
      // console.log('prevFn',this.swiper);
      this.swiper.slidePrev()
    },
    nextFn() {
      // console.log('nextFn',this.swiper);
      this.swiper.slideNext()
    },
  },
}
</script>
 
<style lang="scss">
@import "@/assets/scss/_variable.scss";

.foodListSwiper {
    margin: 60px 0;
    .swiper-button {
        cursor: pointer;
        position: absolute;
        color: $main-white-555;
        transition: .3s all;
        top: 35%;
        font-size: 24px;
        z-index: 2;
        &:hover {
            color: $main-white-text;
        }
        &.swiper-next-btn {
            right: -37px;
        }
        &.swiper-prev-btn {
            left: -37px;
        }
    }
    .swiper-slide {
        .food {
            letter-spacing: 2px;
            .img {
                height: 250px;
                border-right: 3px solid #fff;
                position: relative;
            }  
            .title {
                position: absolute;
                bottom: 0;
                color: #fff;
                letter-spacing: 3px;
                width: 100%;
                height: 50px;
                line-height: 53px;
                font-size: 18px;
                text-align: center;
            }
            .mealData {
                padding: 20px 30px;
                border-right: 1px solid $main-white-opcity-text;
                .meat {
                    height: 105px;
                }
            }
        }
    }
    .food-title {
        color: $main-white-text;
        font-weight: 700;
        background-color: $main-white-555;
        width: 45px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
        margin: 10px 5px 10px 0;
    }
    .otherFood {
        padding: 20px 30px;
        margin-top: -2px;
        &>p {
            position: relative;
            margin-bottom: 10px;
            font-size: 18px;
            color: $main-white-555;
            &::before {
                content: '';
                width: calc(100% - 130px);
                height: 2px;
                background-color: $main-white-999;
                position: absolute;
                right: 0;
                top: 30%;
            }
        }
        .other-block {
            margin-right: 10px;
            min-width: 85px;
            max-width: 160px;
            width: 15%;
        }
    }
    .txt {
        line-height: 28px;
        font-weight: 700;
    }

    @media(max-width:1100px){
        .swiper-slide .food .img {
            height: 220px;
        }
    }
    @media(max-width:840px){
        .swiper-button {
            top: 30%;
        }
        .d-flex {
            flex-wrap: wrap;
            .other-block {
                width: 33.33%;
                max-width: 140px;
                .food-title {
                    margin: 10px 5px 0 0
                }
            }
        }
    }
    @media(max-width:780px){
        .swiper-slide .food .mealData .meat {
            height: 90px;
        }
    }
    @media(max-width:725px){
        .d-flex {
            .other-block {
                width: 33.333%;
                max-width: 180px;
            }
        }
    }
    @media(max-width:690px){
        .d-flex {
            .other-block {
                width: 25%;
                max-width: 120px;
            }
        }
    }
    @media(max-width:630px){
        .d-flex {
            justify-content: space-between;
        }
    }
    @media(max-width:576px){
        .mealData .meat {
            height: 60px !important;
        }
        .food .img {
            border-width: 1px !important;
        }
    }
    @media(max-width:455px){
        .swiper-button {
            top: 25%;
        }
        .mealData .meat {
            height: 80px !important;
        }
    }
    @media(max-width:375px){
        .swiper-slide .food .mealData .meat {
            height: 100px !important;
        }
    }
}
</style>
