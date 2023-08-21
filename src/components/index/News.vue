<template>
    <div class="news container-1440 main-margin-top main-padding-bottom pos-relative">
        <div class="main-title title main-brow-text">
            <h1>活動新訊</h1>
            <p>News</p>
        </div>
        <div class="d-flex justify-content-bewteen">
            <div class="moreBtn align-self-end">
                <router-link to="/news" class="btn-border">
                    <span class="btn-border-text fw-700 transition-0-3">更多消息</span>
                </router-link>
            </div>
            <div class="list pos-relative title-margin-top">
                <swiper
                    :options="swiperOption"
                    :breakpoints="swiperOption.breakpoints"
                    :loop="swiperOption.loop"
                    :autoplay="swiperOption.autoplay"
                    :slides-per-view="swiperOption.slidesPerView"
                    :space-between="swiperOption.spaceBetween"
                    :speed="swiperOption.speed"
                    @swiper="onSwiper"
                >
                    <swiper-slide v-for="(item, index) in newsList" :key="index">
                        <router-link :to="`/new/${item.id}`" class="new">
                            <div>
                                <p class="d-block date text-align-right fw-700 font-CourierNew main-blue-text">{{item.date}}</p>
                                <img :src="item.img" class="img-fit" alt="圖片">
                                <p class="title line1 fw-700 main-brow-text">{{item.title}}</p>
                                <p class="txt main-white-text line3">
                                    <span v-for="(txt, index) in item.txt" :key="index">{{txt}}</span>
                                </p>
                            </div>
                            <div class=" fw-700 main-white-text font-CourierNew">
                                <a class="btn-arrow justify-content-between">
                                    <span class="arrow"></span>
                                    <span class="btn-arrow-text text-align-left main-gray-text fw-700 transition-0-3">View More</span>
                                </a>
                            </div>
                        </router-link>
                    </swiper-slide>
                </swiper>
                <div class="swiper-button swiper-prev-btn" @click="prevFn">
                    <i class="icon-arrow icon-left-open main-white-opcity-text transition-0-3"></i>
                </div>
                <div class="swiper-button swiper-next-btn" @click="nextFn">
                    <i class="icon-arrow icon-right-open main-white-opcity-text transition-0-3"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import newsListData from '@/assets/datas/newsListData.json'
import {
  Swiper, SwiperSlide 
} from 'swiper/vue'
 
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      newsListData: newsListData.news,
      swiper: null,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 80,
        navigation: {
          nextEl: '.swiper-next-btn',
          prevEl: '.swiper-prev-btn',
        },
        loop: true,
        autoplay: false,
        speed: 800,
        breakpoints: {
          1: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      },
    }
  },
  computed: {
    newsList() {
      let ary = []
      this.newsListData.forEach((element, index) => {
        if (index < 5) ary.push(element)
      })
      return ary
    },
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
    },
    prevFn() {
      this.swiper.slidePrev()
    },
    nextFn() {
      this.swiper.slideNext()
    },
  },
}
</script>
 
<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.news {
    .container-1440 {
        padding: 0 40px;
    }
    .list {
        width: 80%;
        padding: 0 50px;
    }
    .swiper-button {
        cursor: pointer;
        position: absolute;
        top: 45%;
        font-size: 24px;
        z-index: 2;
        &.swiper-next-btn {
            right: -10px;            
        }
        &.swiper-prev-btn {
            left: -10px;
        }
        &:hover .icon-arrow {
            color: $main-white-text;
        }
    }
    .btn-border {
        margin-left: 0;
    }
    .swiper-slide {
        height: 420px;
        .new {
            cursor: pointer;
            height: 100%;
            .date {
                font-size: 20px;
                letter-spacing: 2px;
            }
            img {
                height: 200px;
                margin: 10px 0;
                -webkit-filter:grayscale(0.8);
                transition: .5s all;
            }
            .title {
                margin: 10px 0;
                line-height: 1.4;
                font-size: 18px;         
            }
            .txt {
                line-height: 1.8;
                margin-bottom: 23px;
            }
            .btn-arrow {
                padding: 0;
                .btn-arrow-text {
                    position: relative;
                    opacity: 0;
                    right: 10px;
                }
                .arrow {
                    margin-right: 40px;
                    width: 20%;
                    position: relative;
                    left: 0;
                }
            }
            &:hover {
                .btn-arrow-text {
                    color: #EBEAEA;
                    opacity: 1;
                    right: 3px;
                }
                .arrow {
                    width: 30%;
                }
                img {
                    -webkit-filter:grayscale(0);
                }
            }
        }
    }

    @media(max-width:1150px){
        .main-title {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .d-flex {
            flex-wrap: wrap;
            flex-direction: column-reverse;
            .list {
                width: 100%;
            }
            .moreBtn {
                margin-top: 30px;
            }
        }
        .swiper-slide {
            .line3 {
                -webkit-line-clamp: 2;
            }
        }
    }
    @media(max-width:992px){
        .d-flex {
            .moreBtn {
                margin-top: 10px;
            }
        }
        .news .list {
            padding: 0 20px
        }
        img {
            -webkit-filter: grayscale(0) !important;
        } 
    }
     @media(max-width:740px){
        .swiper-button {
            cursor: pointer;
            &.swiper-next-btn {
                right: -20px;            
            }
            &.swiper-prev-btn {
                left: -20px;
            }
        }
        .list {
            padding: 0 20px
        }
        .btn-border {
            margin-right: 20px;
        }
    }
    @media(max-width:710px){
        .title {
            h1 {
                font-size: 32px;
            }
        }
    }
    @media(max-width:576px){
        .list  {
            margin-top: 40px !important;
            .swiper-slide {
                height: 380px;
                img {
                    height: 180px !important;
                } 
            }
        }
        .btn-border {
            margin-top: 20px;
        }
    }
    @media(max-width:530px){
        .title {
            h1 {
                font-size: 28px;
            }
        }
    }
    @media(max-width:500px){
        .swiper-button {
            cursor: pointer;
            &.swiper-next-btn {
                right: -35px;            
            }
            &.swiper-prev-btn {
                left: -35px;
            }
        }
        .list {
            padding: 0;
        }
        .btn-border {
            margin-right: 0;
        }
    }
    @media(max-width:300px){
        .moreBtn {
            align-self: center !important;
        }
    }
}
</style>
