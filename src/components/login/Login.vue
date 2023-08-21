<template>
    <div v-if="isShowLogin" class="login" @click.self="closeLogin">
        <div class="form-section pos-relative">
            <div class="btn-close" @click="closeLogin"></div>
            <p class="title text-align-center fw-700">會員登入</p>
            <form action="login-form" autocomplete="off" class="position-relative" @submit.prevent="clickLoginBtn">
                <p v-if="isShowTip" class="tip">*帳號或密碼錯誤</p>
                <div class="form choose-select">
                    <div class="formBox d-flex flex-direction-column">
                        <label for="contactName" class="colLabel">帳號</label>
                        <input id="contactName" v-model="acc" type="text" autoComplete="off" class="form-control" required @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <div class="formBox">
                        <label for="contactTel" class="colLabel">密碼</label>
                        <input id="contactTel" v-model="pwd" type="password" autoComplete="off" class="form-control"  required @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <label  class="adminCheck">
                        管理員登入
                        <input v-model="isAdminLogin" type="checkbox" name="isAdminLogin">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="align-self-center mt-4">
                    <button type="submit" class="btn d-block text-align-center main-brow-text">
                        <span>登 入</span>
                    </button>
                </div>
            </form>
            <!-- <div class="d-flex flex-direction-col align-items-center">
            <p class="orTxt text-align-center main-gray-text">or with</p>
            <div class="d-flex">
                <a href="#" class="loginIcon icon-gplus"></a>
                <a href="#" class="loginIcon icon-facebook"></a>
                <a href="#" class="loginIcon icon-line"></a>
            </div>
        </div> -->
            <a class="d-flex justify-content-end" @click="clickRegisterBtn">
                <span class="register-btn main-light-blue-text">還沒有帳號？<span class="fw-700"> 註冊</span></span>
            </a> 
        </div>
    </div>
</template>

<script>
import {
  useCookies 
} from 'vue3-cookies'
const { cookies } = useCookies()

export default {
  data() {
    return {
      isAdminLogin: false,
      isShowTip: false,
      acc: '',
      pwd: '',
    }
  },
  computed: {
    isShowLogin() {
      return this.$store.state.isShowLogin
    },
    orderMessageShop() {
      return this.$store.state.orderMessage.shop
    },
    isAdiminsLogin() {
      return this.$store.state.isAdiminsLogin
    },
  },
  methods: {
    clickRegisterBtn() {
      this.clearForm()
      this.$store.dispatch('updateIsShowLogin', false)
      this.$store.dispatch('updateIsShowRegister', true)
    },
    goOrderMessage() {
      if (this.orderMessageShop == '') return
      if (this.isAdiminsLogin) {
        this.$store.dispatch('updateOrderLevel', 1)
        return
      }
      this.$store.dispatch('updateOrderLevel', 2)
      this.goTop()
    },
    clickLoginBtn() {
      this.$store.dispatch('updateIsShowLoading', 0)
      const isMemberLoginApi = (!this.isAdminLogin) ? process.env.VUE_APP_M_LOGIN : process.env.VUE_APP_A_LOGIN
      this.axios.post(isMemberLoginApi, {
        'acc': this.acc,
        'pwd': this.pwd,
      }).then((response) => {
        this.$store.dispatch('updateIsShowLoading', 1)
        const backData = response.data
        if (backData.status === 'success') {
          cookies.set('acc', this.acc, '6h')
          cookies.set('pwd', this.pwd, '6h')
          if (!this.isAdminLogin) {
            cookies.set('isAdmin', false, '6h')
            this.storeMemberData(backData)
          } else {
            cookies.set('isAdmin', true, '6h')
            this.$store.dispatch('updateIsAdiminsLogin', true)
          }
          this.loginSucFn()
        } else {
          this.loginFalseFn()
        }
      }).catch(function(error) {
        console.log('error',error)
      })
    },
    loginSucFn() {
      this.$store.dispatch('updateIsLoginSuccess', true)
      this.$store.dispatch('updateIsShowNotice', true)
      const noticeTxt = (!this.isAdminLogin) ? '會員' : '管理員'
      this.$store.dispatch('updateNoticeText', `${noticeTxt}登入成功！`)
      this.closeLogin()
      this.goOrderMessage()
    },
    storeMemberData(backData) {
      const memberData = backData.result[0]
      this.$store.dispatch('updateMemberName', memberData.name)
      this.$store.dispatch('updateMemberCellphone', memberData.cellphone)
      this.$store.dispatch('updateMemberEmail', memberData.email)
      this.$store.dispatch('updateMemberPassword', memberData.pwd)
      this.$store.dispatch('updateMemberId', memberData.MID)
    },
    loginFalseFn() {
      this.isShowTip = true
      this.pwd = ''
      $('.form-section').addClass('animate_headShake')
      $('.form-section').on('webkitAnimationEnd', function(){
        $('.form-section').removeClass('animate_headShake')
      })
    },
    focusInputFn(el) {
      $(el.target).closest('.formBox').addClass('inputFocus')
    },
    blurInputFn(el) {
      $(el.target).closest('.formBox').removeClass('inputFocus')
    },
    closeLogin() {
      this.clearForm()
      this.$store.dispatch('updateIsShowLogin', false)
      this.startScrollBar()
    },
    clearForm() {
      this.isShowTip = false
      this.isAdminLogin = false
      this.acc = ''
      this.pwd = ''
    },
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
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.login {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn-close {
        right: 25px;
        top: 30px;
        &:hover {
           ::after, ::before {
                box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 3px, rgba(0, 0, 0, 0.1) 0px 3px 3px;
            } 
        }
    }
    .register-btn {
        margin-top: 40px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 20px;
        line-height: 0;
        &::after, &::before {
            content: '';
            width: 100%;
            height: 0.5px;
            background-color: $main-light-blue-text;
            position: absolute;
            bottom: 1px;
            left: 0;
        }
        &::before {
            left: -100%;
        }
        &:hover::after {
            animation: lineHoverOne .3s forwards;
        }
        &:hover::before {
            animation: lineHoverTwo .3s .3s forwards;
        }
    }
    .form-section {
        background-color: #fff;
        border-radius: 5px;
        padding: 50px 40px;
        box-shadow: rgba(250, 250, 193, 0.25) 0px 13px 27px -5px, rgba(255, 255, 255, 0.3) 0px 8px 16px -8px;
        .title {
            font-size: 24px;
            margin-bottom: 50px;
        }
        .tip {
            position:absolute;
            top: -30px;
            right:0;
            font-size: 14px;
            color: rgb(212, 4, 4);
        }
        .btn {
            width: 100%;
            height: 45px;
            letter-spacing: 5px;
            border-radius: 0;
            background-color: $main-blue-text;
            color: $main-white-text;
            box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 6px, rgba(0, 0, 0, 0.1) 0px 3px 6px;
            &:hover {
                background-color: $main-light-blue-text
            }
        }
        .formBox {
            width: 100%;
            border: solid 1px rgba(205, 205, 205, 0.7);
            display: flex;
            align-items: center;
            position: relative;
            transition: all 0.4s;
            margin-bottom: 20px;
            .colLabel {
                min-width: 85px;
                padding: 0 0 0 20px;
                margin: 4px 0;
                line-height: 25px;
                color: #242424;
                position: relative;
                z-index: 1;
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 10px;
                    width: 0.5px;
                    height: 25px;
                    background-color: rgba(205, 205, 205, 0.7);
                }
            }
            .form-control{
                border:none;
                letter-spacing: 2px;
                padding: 0;
                &:focus {
                    color: #495057;
                    background-color: transparent;
                    outline: 0;
                    box-shadow: 0 0 0 0 rgb(0 123 255 / 25%);
                }
            }
            &.inputFocus .colLabel::before,
            &:hover .colLabel::before {
                background-color: $main-light-blue-text;
            }
            &.inputFocus,
            &.inputFocus label,
            &:hover {
                border-color: $main-light-blue-text;
                color: $main-blue-text !important;
            }
        }

        .adminCheck {
            position: relative;
            padding-left: 25px;
            input {
                display: none;
            }
            .checkmark {
                position: absolute;
                left: 0;
                height: 15px;
                width: 15px;
                border-radius: 3px;
                transition: .3s all;
                border: 2px solid rgba(205, 205, 205, 0.7);
            }
            &:hover input ~ .checkmark {
                border-color: #495057;
            }
            input:checked ~ .checkmark {
                background-color: #495057;
                border-color: #495057;
            }
            .checkmark::after {
                content: "";
                position: absolute;
                left: 3.5px;
                width: 5px;
                height: 8px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
        }
    }
    .orTxt {
        margin: 40px 0 25px 0;
        position: relative;
        width: 100%;
        text-align: center;
        &::after, &::before {
            content: '';
            position: absolute;
            top: 50%;
            width: calc(100% - 200px);
            height: 0.5px;
            background-color: $main-gray-text;
        }
        &::after {
            left: 0; 
        }
        &::before {
            right: 0;
        }
    }
    .loginIcon {
        border: 2px solid $main-light-blue-text;
        width: 37px;
        height: 37px;
        border-radius: 50%;
        margin: 0 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $main-light-blue-text;
        transition: .1s all;
        box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 6px, rgba(0, 0, 0, 0.1) 0px 3px 6px;
        &:hover {
            background-color: $main-blue-text;
            color: #fff;
        }
    }
}
</style>