<template>
    <div class="loading loadingHide">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  computed: {
    isShowLoading() {
      return this.$store.state.isShowLoading
    },
    isShowAutoLoading() {
      return this.$store.state.isShowAutoLoading
    },
  },
  watch: {
    isShowLoading() {
      if (this.isShowLoading === 0) {
        // 開啟
        $('.loading').removeClass('loadingHide')
        return
      }
      if (this.isShowLoading === 1) {
        // 立刻關閉
        $('.loading').addClass('loadingHide')
        return
      }
      if (this.isShowLoading === 2) {
        // 開啟且自動過幾秒關閉
        $('.loading').removeClass('loadingHide')
        this.closeLoading(500, 1000)
        return
      } 
      if (this.isShowLoading === 3) {
        // 過幾秒關閉
        this.closeLoading(500, 700)
        return
      } 
    },
  },
  methods: {
    createRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    // 禁用滾動條
    stopScrollBar() {
      var tops = $(document).scrollTop()
      $(document).bind('scroll',function (){$(document).scrollTop(tops) })
    },
    startScrollBar() {
      $(document).unbind('scroll')
    },
    closeLoading(minSec, maxSec) {
      this.stopScrollBar()
      let randomSec = this.createRandom(minSec, maxSec)
      this.timeout = setTimeout(() => {
        this.startScrollBar()
        $('.loading').addClass('loadingHide')
        this.$store.dispatch('updateIsShowLoading', 1)
        clearTimeout(this.timeout)
      }, randomSec)
    },
  },
}
</script>

<style lang="scss" scoped>
span:nth-child(1) {
    animation: loadingAnim 0.8s 0.08s ease-out infinite
}
span:nth-child(2) {
    animation: loadingAnim 0.8s 0.16s ease-out infinite
}
span:nth-child(3) {
    animation: loadingAnim 0.8s 0.24s ease-out infinite
}

.loading {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #fff;
        margin-right: 40px;
        opacity: 0;
        transform: scale(0.2);
        &:last-child {
            margin: 0;
        }
    }

    @media(max-width:576px){
        span {
            width: 20px;
            height: 20px;
            margin-right: 35px;
        }
    }
    @media(max-width:390px){
        span {
            width: 15px;
            height: 15px;
        }
    }
}

.loadingHide {
    display: none;
}
</style>