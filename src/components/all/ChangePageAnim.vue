<template>
    <div class="changePage">
        <img :src="logoUrl" alt="茶六" class="align-self-center">
    </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'ChangePageAnim',
  data() {
    return {
      logoUrl: require('@/assets/images/all/logo.png'),
    }
  },
  computed: {
    isChangePageAnim() {
      return this.$store.state.isChangePageAnim
    },
    isFirstEnterWeb() {
      return this.$store.state.isFirstEnterWeb
    },
  },
  watch: {
    isChangePageAnim() {
      if (this.isChangePageAnim === false) return
      this.gsapPageAnim()
    },
  },
  methods: {
    // 禁用滾動條
    stopScrollBar() {
      var tops = $(document).scrollTop()
      $(document).bind('scroll',function (){$(document).scrollTop(tops) })
    },
    startScrollBar() {
      $(document).unbind('scroll')
    },
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
    gsapPageAnim() {
      let sec = 0.8
      if (this.isFirstEnterWeb) {
        sec = 1.2
        this.$store.dispatch('updateIsFirstEnterWeb', false)
        $('.changePage').addClass('opacity-index-changePage')
      }

      gsap.timeline()
        .to('.changePage', {duration: 0,
          left: 0 })
        .to('.changePage', {duration: 0.1,
          alpha: 1 })
        .add(() => {
          $('.navBottom').removeClass('showBottomBtn')
          $('.navBottom').removeClass('showMenuBottomBtn')
        })
        .to('.changePage', {duration: sec,
          alpha: 1 })
        .add(() => {
          this.startScrollBar()
          this.goTop()
        })
        .to('.changePage', {duration: 0.1,
          alpha: 0 })
        .to('.changePage', {duration: 0,
          left: '-100%',
          delay: 0.6,
          onComplete: () => {
            this.$store.dispatch('updateIsChangePageAnim', false)
            $('.changePage').removeClass('opacity-index-changePage');
            ($(window).scrollTop() > 10) ? $('.navBottom').addClass('showBottomBtn') : $('.navBottom').removeClass('showBottomBtn')
          }})
    },
        
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.changePage {
    width: 100%;
    height: 100%;
    background-color: $main-common-blue-text;
    opacity: 1;
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 98;
    transition: .6s opacity;
    display: flex;
    justify-content: center;
    align-content: center;
    img {
        height: 250px;
        opacity: 0;
    }

    @media(max-width:576px){
        img {
            height: 180px;
        }
    }
}
.opacity-index-changePage {
    z-index: 100;
    img {
        opacity: 1;
    }
}

</style>