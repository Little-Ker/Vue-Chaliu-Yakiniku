<template>
    <div v-if="isShowNotice" class="noticeModel d-flex justify-content-center align-items-center">
        <transition name='fadeIn' appear @after-enter='afterEnterFn'>
            <div class="model">
                <p class="icon-ok-circled text-align-center"></p>
                <p class="title fw-700 text-align-center">{{noticeText}}</p>
            </div>
        </transition>
    </div>
    <div v-if="isShowCheckNotice" class="noticeModel d-flex justify-content-center align-items-center" @click.self="clickCancelBtn">
        <transition name='checkfadeIn' appear @after-enter='afterEnterFn'>
            <div class="model">
                <p class="icon-logout text-align-center"></p>
                <p class="title fw-700 text-align-center">確定是否登出?</p>
                <div class="d-flex mt-4 justify-content-end">
                    <a class="btn cancel d-flex justify-content-center align-items-center" @click="clickCancelBtn">
                        <span>取消</span>
                    </a>
                    <a class="btn d-flex justify-content-center align-items-center" @click="clickLogoutBtn">
                        <span>確定</span>
                    </a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {
  useCookies 
} from 'vue3-cookies'
const { cookies } = useCookies()

export default {
  computed: {
    isShowNotice() {
      return this.$store.state.isShowNotice
    },
    noticeText() {
      return this.$store.state.noticeText
    },
    isShowCheckNotice() {
      return this.$store.state.isShowCheckNotice
    },
  },
  watch: {
    isShowNotice() {
      (this.isShowNotice) ? this.stopScrollBar() : this.startScrollBar()
    },
    isShowCheckNotice() {
      (this.isShowCheckNotice) ? this.stopScrollBar() : this.startScrollBar()
    },
  },
  methods: {
    clickCancelBtn() {
      this.$store.dispatch('updateIsShowCheckNotice', false)
    },
    clickLogoutBtn() {
      this.removeCookie()
      this.resetMemberData()
      this.$store.dispatch('updateIsShowNotice', true)
      this.$store.dispatch('updateNoticeText', '登出成功')
      this.$store.dispatch('updateIsShowCheckNotice', false)
      this.$store.dispatch('updateIsLoginSuccess', false)
      this.$store.dispatch('updateIsAdiminsLogin', false)
      this.goTop()
      this.$router.push('/')
    },
    removeCookie() {
      cookies.remove('acc')
      cookies.remove('pwd')
      cookies.remove('isAdmin')
    },
    resetMemberData() {
      this.$store.dispatch('updateMemberName', null)
      this.$store.dispatch('updateMemberCellphone', null)
      this.$store.dispatch('updateMemberEmail', null)
      this.$store.dispatch('updateMemberPassword', null)
      this.$store.dispatch('updateMemberId', null)
    },
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
    // 禁用滾動條
    stopScrollBar() {
      var tops = $(document).scrollTop()
      $(document).bind('scroll',function (){$(document).scrollTop(tops) })
    },
    startScrollBar() {
      $(document).unbind('scroll')
    },
    afterEnterFn() {
      this.$store.dispatch('updateIsShowNotice', false)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.noticeModel {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    z-index: 100;
    .model {
        position: relative;
        padding: 50px 60px;
        border-radius: 0.3rem;
        background-color: #fff;
        .icon-ok-circled, .icon-logout {
            font-size: 64px;
            margin-bottom: 32px;
            color: $main-blue-text;
        }
        .icon-logout {
            margin-bottom: 50px;
        }
        .title {
            color: $main-light-blue-text;
            font-size: 24px;
        }
        .btn {
            width: 100px;
            height: 45px;
            letter-spacing: 5px;
            border-radius: 0;
            background-color: $main-blue-text;
            color: $main-white-text;
            &:hover {
                background-color: $main-light-blue-text
            }
        }
        .cancel {
            background-color: #fff;
            border: 1px solid $main-blue-text;
            color: $main-blue-text;
            margin-right: 30px;
            &:hover {
                background-color: #eeeeee
            }
        }
    }

    @media(max-width:576px){ 
        .model {
            padding: 40px;
            .title {
                font-size: 20px;
            }
            .icon-logout {
                font-size:56px;
                margin-bottom:30px;
            }
            .cancel {
                margin-right: 15px;
            }
        }
    }
}

/* 提示框進出場動畫 */
.fadeIn-enter-active {
    animation: fadeInOut 2s;
}
.checkfadeIn-enter-active {
    animation: fadeIn .6s;
}
</style>