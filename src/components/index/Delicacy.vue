<template>
    <div class="delicacy">
        <div class="top d-flex justify-content-bewteen container-1440">
            <div class="title">
                <h1 class="main-brow-text">美食饗宴</h1>
                <p class="main-brow-text">Delicacy</p>
            </div>
            <div class="food-list d-flex justify-content-around">
                <router-link v-for="(item, index) in foodTitleList" :key="index" :to="`/menu?id=${typeListAryIndex(item.title)}`" class="item d-flex">
                    <div class="food-item-img">
                        <div :class="item.class" class="bgScale bg-fit transition-0-6" :style="{backgroundImage:'url('+item.img+')'}"></div>
                    </div>
                    <p class="food-item-title main-brow-text fw-700">{{item.title}}</p>
                    <div class="btn-arrow align-self-end">
                        <span class="arrow"></span>
                        <span class="btn-arrow-text main-gray-text fw-700 transition-0-3">View More</span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="bottom d-flex justify-content-bewteen">
            <div class="moreBtn align-self-end">
                <router-link to="/menu" class="btn-border">
                    <span class="btn-border-text fw-700 transition-0-3">線上菜單</span>
                </router-link>
            </div>
            <div class="marquee-swiper">
                <swiper
                    id="test2"
                    :modules="modules"
                    :speed="swiperOption.speed"
                    :loop="swiperOption.loop"
                    :free-mode="swiperOption.freeMode"
                    :autoplay="swiperOption.autoplay"
                    :breakpoints="swiperOption.breakpoints"
                    :slides-per-view="swiperOption.slidesPerView"
                    :space-between="swiperOption.spaceBetween"
                    class="swiper-no-swiping"
                >
                    <swiper-slide v-for="(item, index) in foodMarqueeAry" :key="index" class="bg-fit" :style="{backgroundImage:'url('+item.img+')'}">
                        <div class="blackHide transition-0-1 d-flex justify-content-center align-items-center">
                            <div class="blackHide-border transition-0-1">
                                <p class="transition-0-1 main-white-text">{{item.name}}</p>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import {
  Autoplay, FreeMode 
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
      modules: [ Autoplay, FreeMode ],
    }
  },
  data() {
    return {
      foodListFoodData: foodListData.food,
      foodTitleList: [
        {
          img: require('@/assets/images/index/delicacy/01.jpg'),
          title: '開胃小品',
          'class': 'soup',
        }, {
          img: require('@/assets/images/index/delicacy/02.jpg'),
          title: '套餐主食',
          'class': 'meat',
        }, {
          img: require('@/assets/images/index/delicacy/03.jpg'),
          title: '海鮮蔬食',
          'class': 'seafood',
        }, {
          img: require('@/assets/images/index/delicacy/04.jpg'),
          title: '甜點飲品',
          'class': 'drink',
        },
      ],
      swiper: null,
      swiperOption: {
        speed: 6000,
        loop: true,
        freeMode: true,
        slidesPerView: 5,
        spaceBetween: 30,
        autoplay: {
          delay: 1,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        breakpoints: {
          1: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          580: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          810: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          880: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1100: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1400: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        },
      },
    }
  },
  computed: {
    foodMarqueeAry() {
      return this.foodListFoodData.filter((food) => {
        return food.name.length === 4
      })
    },
    typeListAry() {
      let typeAry = ['所有單點']
      this.foodListFoodData.forEach((food) => {
        if (typeAry.indexOf(food.type) === -1) typeAry.push(food.type)
      })
      return typeAry
    },
    typeListAryIndex() {
      return function(type) {
        const index = this.typeListAry.indexOf(type)
        return index
      }
    },
  },
  methods: {
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
  },
}
</script>

<style lang="scss">
.swiper-free-mode>.swiper-wrapper {
    -webkit-transition-timing-function: linear;
    -moz-transition-timing-function: linear;
    -ms-transition-timing-function: linear;
    -o-transition-timing-function: linear;
    transition-timing-function: linear;
    margin: 0 auto;
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.delicacy {
    .swiper-no-swiping {
        height: 100%;
    }
    .marquee-swiper {
        width: 80%;
        height: 160px;
        .swiper {
            width: 100%;
            height: 100%;
        }
    }
    overflow: hidden;
    margin-top: 110px;
    .title {
        margin-right: 30px;
        margin-bottom: 30px;
        h1 {
            font-size: 36px;
            margin-bottom: 10px;
        }
        p {
            font-size: 18px;
            margin-left: 3px;
        }
    }
    .food-list {
        width: calc(100% - 200px);
        margin-bottom: 60px;
        .item {
            .food-item-img {
                overflow: hidden;
                width: 120%;
                height: 230px;
                position: absolute;
                bottom: 17%;
                left: -45%;
                box-shadow: rgba(0, 0, 0, 0.8) 0px 15px 20px -10px;
            }
            position: relative;
            cursor: pointer;
            width: 160px;
            height: 400px;
            border: 2px solid $main-white-opcity-text;
            border-right: 0;
            margin-left: 30px;
            transition: .3s all;
            &::after,
            &::before {
                transition: .3s all;
                content: '';
                position: absolute;
                right: 0;
                height: 5%;
                border-right: 2px solid $main-white-opcity-text;
            }
            &::after {
                top: 0;
            }
            &::before {
                bottom: 0;
            }
            .food-item-title {
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                right: -12px;
                top: 10%;
                letter-spacing: 3px;
                font-size: 24px;
                &::before {
                    content: '';
                    position: absolute;
                    transition: .3s all;
                    right: 12px;
                    top: 47px;
                    width: 2px;
                    height: 130px;
                    background-color: $main-white-opcity-text;
                }
            }
            .btn-arrow {
                margin-bottom: 13px;
            }
            .btn-arrow-text {
                writing-mode: vertical-lr;
                height: 100px;
                position: absolute;
                right: -6px;
                bottom: 70%;
            }
            &:hover {
                border-color: rgba(255, 255, 255, 0.45);
                &::after,
                &::before {
                    border-color: rgba(255, 255, 255, 0.45);
                }
                .arrow {
                    width: 50px;
                    background-color: $main-white-text;
                }
                .btn-arrow-text {
                    color: $main-white-text;
                }
                .bgScale {
                    transform: scale(1.1);
                }
                .food-item-title::before {
                    background-color: rgba(255, 255, 255, 0.45);
                }
            }
        }
    }
    .moreBtn {
        padding-left: calc((100% - 1440px) / 2);
    }
    .marquee-swiper {
        .swiper-slide {
            &:hover .blackHide {
                background-color: rgba(0, 0, 0, 0.7);
                .blackHide-border {
                    opacity: 1;
                }
            }
            .blackHide {
                background-color: rgba(0, 0, 0, 0.5);
                .blackHide-border {
                    opacity: 0;
                    border: 2px solid $main-white-text;
                    padding: 15px 18px;
                    text-align: center;
                    font-size: 16px;
                    p {
                        line-height: 20px;
                        letter-spacing: 2px;
                        margin: 0;
                        text-align: center;
                        width: 50px;
                    }
                }
            }
        }
    }

    @media(max-width:1330px){
        margin-top: 60px;
        .top {
            padding: 40px 30px;
            flex-wrap: wrap;
            flex-direction: column;
            .title {
                margin-right: 0;
                margin-bottom: 60px;
                align-self: center;
                p {
                    text-align: center;
                }
            }
            .food-list {
                width: 100%;
            }
        }
    }
    @media(max-width:1150px){
        margin-top: 30px;
        .top {
            .title {
                margin-bottom: 80px;
            }
            padding: 0 80px;
        }
        .food-list {
            flex-wrap: wrap;
            justify-content: space-between !important;
            margin-bottom: 20px;
            .item {
                width: 46%;
                height: 180px;
                margin: 0 10px 60px 0;
                &::after {
                    height:47%;
                }
                &::before {
                    height:7%;
                }
                .food-item-img {
                    width: 50%;
                    height: 100%;
                    bottom: 12%;
                    left: 5%;
                }
                .food-item-title {
                    top: 55%;
                    right: 22px;
                    &::before {
                        display: none;
                    }
                }
                .btn-arrow {
                    padding: 10px 30px;
                    justify-content: flex-start;
                    flex-direction: row-reverse;
                    .arrow {
                        top: 50%;
                        left: 93%;
                    }
                    .btn-arrow-text {
                        writing-mode:horizontal-tb;
                        height: auto;
                        position: relative;
                        margin-right: 17px;
                        margin-bottom: 5px;
                    } 
                }
            }
        }
        .moreBtn {
            padding-left: 60px;
        }
    }
    @media(max-width:880px){
        .food-list {
            margin-bottom: 0;
            justify-content: center !important;
            .item {
                height: 160px;
                width:95%;
                margin: 0 0 40px 0;
                &::after {
                    height:35%;
                }
                &::before {
                    height:10%;
                }
                .food-item-title {
                    font-weight: 500 !important;
                    top: 50%;
                    right: 25px;
                }
                .food-item-img {
                    left: 4%;
                    .soup {
                        background-position-y: 65%;
                    }
                    .meat {
                        background-position-y: 15%;
                    }
                    .drink {
                        background-position-y: 30%;
                    }
                }
                .btn-arrow {
                    .arrow {
                        left: 95%;
                    }
                }
            }
        }
        .bottom {
            flex-direction: column;
            flex-wrap: wrap;
            .moreBtn {
                padding-right: 95px;
                margin-bottom: 40px;
                a {
                    margin: 0;
                }
            }
            .marquee-swiper {
                width: 100%;
            }
        }
    }
    @media(max-width:820px){
        .marquee-swiper {
            height: 140px;
        }
    }
    @media(max-width:710px){
        .title {
            h1 {
                font-size: 32px;
            }
        }
    }
    @media(max-width:690px){
        .top {
            padding: 30px 60px;
            padding-bottom: 0px;
        }
        .food-list {
            .item {
                height: 140px;
                margin: 0 0 30px 0;
                .food-item-title {
                    top: 43%;
                }
            }
            
        }
        .bottom {
            .moreBtn {
                padding-right: 75px;
                margin-bottom: 30px;
            }
        }
    }
    @media(max-width:576px){
        .top {
            padding: 30px 30px;
            padding-bottom: 0;
            .title {
                margin-bottom: 60px;
            }
        }
        .food-list {
            .item {
                .food-item-title {
                    font-size: 20px;
                    top: 50%;
                    right: 38px;
                }
                .btn-arrow {
                    margin-bottom: 5px;
                }
            }
        }
        .bottom {
            .moreBtn {
                padding-right: 42px;
            }
        }
    }
    @media(max-width:530px){
        .title {
            h1 {
                font-size: 28px;
            }
        }
        .food-list {
            .item {
                height: 120px;
                &::after {
                    height:40%;
                }
                &::before {
                    height:8%;
                }
                .food-item-title {
                    font-size: 18px;
                    right: 45px;
                }
                .btn-arrow {
                    margin-bottom: 0;
                    .arrow {
                        left: 93% !important;
                    }
                }
            }
        }
    }
    @media(max-width:450px){
        .top {
            padding: 30px 10px;
            padding-bottom: 0;
        }
        .food-list {
            .item {
                .food-item-img {
                    width: 40%;
                }
                .btn-arrow {
                    .arrow {
                        left: 91% !important;
                    }
                }
            }
        }
        .bottom {
            .moreBtn {
                padding-right: 20px;
            }
            .blackHide-border {
                padding: 8px 10px !important;
            }
        }
    }
    @media(max-width:390px){
        .marquee-swiper {
            height: 100px;
            .blackHide-border {
                padding: 5px 5px !important;
                font-size: 14px !important;
                p {
                    width: 40px !important;
                }
            }
        }
    }
    @media(max-width:360px){
        .food-list {
            .btn-arrow {
                .arrow {
                    left: 89% !important;
                }
            }
        }
        .bottom {
            .moreBtn {
                align-self: center !important;
                padding: 0;
            }
        }
    }
    @media(max-width:330px){
        .food-list {
            .item {
                .food-item-title {
                    top: 45%;
                }
                .btn-arrow {
                    padding-bottom: 15px;
                    .arrow {
                        left: 89% !important;
                        top: 45%;
                    }
                }
            }
        }
    }
    @media(max-width:300px){
        .marquee-swiper {
            height: 80px;
        }
    } 
}
</style>