<template>
    <div class="banner">
        <swiper
            id="test"
            :modules="modules"
            :loop="swiperOption.loop"
            :effect="swiperOption.effect"
            :autoplay="swiperOption.autoplay"
            :speed="swiperOption.speed"
            class="swiper-scale-effect swiper-no-swiping"
            @swiper="onSwiper"
        >
            <swiper-slide v-for="(item, index) in swiperList" :key="index">
                <div class="slide-bg swiper-slide-cover" :class="item.class" :style="{backgroundImage:'url('+item.img+')'}">
                    <div class="blackHide"></div>
                </div> 
            </swiper-slide>
        </swiper>
        <div class="banner-text">
            <p class="title">{{bannerText.topText}}</p>
            <p class="content">{{bannerText.bottomText}}</p>
        </div>
    </div>
</template>
<script>
import SwiperCore,  {
  Navigation, EffectFade,  Autoplay 
} from 'swiper'
import {
  Swiper, SwiperSlide 
} from 'swiper/vue'

SwiperCore.use(Navigation, EffectFade, Autoplay)

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [ Navigation, EffectFade, Autoplay ],
    }
  },
  data() {
    return {
      swiper: null,
      swiperOption: {
        effect: 'fade',
        loop: true,
        freeMode: true,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false,
        },
        speed: 1000,
      },
      swiperList: [
        {
          img: require('@/assets/images/index/banner01.jpg'),
        },
        {
          img: require('@/assets/images/index/banner02.jpg'),
        },
      ],
      bannerText: {
        topText: '美味與人的入心追求',
        bottomText: '茶六 おもてなし',
      },
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
    },
  },
}
</script>

<style lang="scss">
@keyframes scaleAmim {
    from {
        transform: scale(1.2);
    }
    to {
        transform: scale(1);
    }
}

.banner {
    height: 100vh;
    .swiper-scale-effect .swiper-slide.swiper-slide-active .swiper-slide-cover {
        animation: scaleAmim 8s;
        animation-fill-mode: forwards;
        transition:10s;
    }
    .swiper-slide-prev .swiper-slide-cover {
        transform: scale(1);
        transition:10s;
    }
    position: relative;
    .swiper-slide {
        height: 100vh;
        .slide-bg {
            background-size: cover;
            background-position: center;
            height: 100%;
        }
    }
    .banner-text {
        position: absolute;
        bottom: 0;
        padding: 100px;
        z-index: 1;
        text-align: right;
        letter-spacing: 4px;
        color: #fff;
        text-shadow: black 0.1em 0.1em 0.2em;
        .title {
            font-size: 44px;
        }
        .content {
            font-size: 28px;
            margin: 30px 0px;
        }
    }

    @media(max-width:950px){
        .banner-text {
            padding: 60px;
            letter-spacing: 4px;
        }
    }
    @media(max-width:650px){
        .banner-text {
            padding: 50px;
            .title {
                font-size: 34px;
            }
            .content {
                font-size: 22px;
                margin: 20px 0 0 0;
            }
        }
    }
    @media(max-width:430px){
        .banner-text {
            padding: 60px 30px;
            .title {
                font-size: 28px;
            }
            .content {
                font-size:20px;
            }
        }
    }
    @media(max-width:320px){
        .banner-text {
            padding: 40px 15px;
            .title {
                font-size: 26px;
            }
            .content {
                font-size:18px;
                margin: 15px 0 0 0;
            }
        }
    }
}
</style>