<template>
    <div v-if="isShowRegister" class="register" @click.self="closeRegister">
        <div class="form-section pos-relative">
            <div class="btn-close" @click="closeRegister"></div>
            <p class="title text-align-center fw-700">新會員註冊</p>
            <form action="login-form" autoComplete="off" class="position-relative" @submit.prevent="clickRegisterBtn">
                <div class="form choose-select">
                    <div :class="{'redTip': isShowAccTip}" class="formBox d-flex flex-direction-column">
                        <label for="contactAcc" class="colLabel">帳號</label>
                        <input id="contactAcc" v-model="acc" type="text" autoComplete="off" maxlength="10" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <p v-if="isShowAccTip" class="tip">*此帳號已有人使用</p>
                    <div class="formBox">
                        <label for="contactPwd" class="colLabel">密碼</label>
                        <input v-model="pwd" type="password" id="contactPwd" autoComplete="off" minlength="5" placeholder="請輸入至少5個字元" maxlength="10" class="form-control" required  @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <div :class="{'redTip': isShowTip}" class="formBox">
                        <label for="contactCheckPwd" class="colLabel">密碼確認</label>
                        <input id="contactCheckPwd" v-model="checkPwd" type="password" maxlength="10" autoComplete="off" placeholder="請重複輸入密碼" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <p v-if="isShowTip" class="tip">*密碼重複輸入錯誤</p>
                    <div class="formBox d-flex flex-direction-column">
                        <label for="contactName" class="colLabel">姓名</label>
                        <input id="contactName" v-model="name" type="text" maxlength="5" autoComplete="off" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <div class="formBox d-flex flex-direction-column">
                        <label for="contactCellphone" class="colLabel">手機</label>
                        <input id="contactCellphone" v-model="cellphone" type="tel" maxlength="10" autoComplete="off" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <div class="formBox d-flex flex-direction-column">
                        <label for="contactEmail" class="colLabel">信箱</label>
                        <input id="contactEmail" v-model="email" type="email" maxlength="10" autoComplete="off" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                </div>
                <div class="align-self-center mt-4">
                    <button type="submit" class="btn d-block text-align-center main-brow-text">
                        <span>註 冊</span>
                    </button>
                </div>
            </form>
            <a class="d-flex justify-content-end" @click="clickLoginBtn">
                <span class="register-btn main-light-blue-text">已經有帳號<span class="fw-700"> 登入</span></span>
            </a> 
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isShowTip: false,
      isShowAccTip: false,
      acc: null,
      pwd: null,
      checkPwd: null,
      name: null,
      cellphone: null,
      email: null,
    }
  },
  computed: {
    isShowRegister() {
      return this.$store.state.isShowRegister
    },
  },
  methods: {
    clickRegisterBtn() {
      if (this.pwd !== this.checkPwd) {
        this.isShowTip = true
        this.showFalseAnim()
        return
      }
      this.$store.dispatch('updateIsShowLoading', 0)
      const memberCheckAcc = process.env.VUE_APP_M_CHECK_ACC
      this.axios.post(memberCheckAcc, {
        'acc': this.acc,
      }).then((response) => {
                
        const backData = response.data
        if (backData.status === 'success') {
          this.checkAccSucFn()
        } else {
          this.isShowAccTip = true
          this.$store.dispatch('updateIsShowLoading', 1)
          this.showFalseAnim()
        }
      }).catch(function(error) {
        console.log('error',error)
      })
    },
    checkAccSucFn() {
      const memberRegistnApi = process.env.VUE_APP_M_REGIST
      this.axios.post(memberRegistnApi, {
        'acc': this.acc,
        'pwd': this.pwd,
        'name': this.name,
        'cellphone': this.cellphone,
        'email': this.email,
      }).then((response) => {
        this.$store.dispatch('updateIsShowLoading', 1)
        this.registSucFn()
      }).catch(function(error) {
        console.log('error',error)
      })
    },
    registSucFn() {
      this.clickLoginBtn()
      this.$store.dispatch('updateIsShowNotice', true)
      this.$store.dispatch('updateNoticeText', '會員註冊成功！')
    },
    clickLoginBtn() {
      this.$store.dispatch('updateIsShowLogin', true)
      this.$store.dispatch('updateIsShowRegister', false)
      this.clearForm()
    },
    showFalseAnim() {
      $('.form-section').addClass('animate_headShake')
      $('.form-section').on('webkitAnimationEnd', function(){
        $('.form-section').removeClass('animate_headShake')
      })
    },
    clearForm() {
      this.acc = null
      this.pwd = null
      this.checkPwd = null
      this.name = null
      this.cellphone = null
      this.email = null
      this.isShowTip = false
      this.isShowAccTip = false
    },
    focusInputFn(el) {
      $(el.target).closest('.formBox').addClass('inputFocus')
    },
    blurInputFn(el) {
      $(el.target).closest('.formBox').removeClass('inputFocus')
    },
    closeRegister() {
      this.$store.dispatch('updateIsShowRegister', false)
      this.startScrollBar()
      this.clearForm()
    },
    // 禁止輸入空格
    keydownNull(e){
      if(e.keyCode == 32){
        e.returnValue = false
      }
    },
    // 禁用滾動條
    stopScrollBar() {
      var tops = $(document).scrollTop()
      $(document).bind('scroll',function (){$(document).scrollTop(tops) })
    },
    startScrollBar() {
      $(document).unbind('scroll')
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.register {
    overflow: auto;
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
        line-height: 0;
        margin-top: 40px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 20px;
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
            margin-bottom: 40px;
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
        .tip {
            position: relative;
            top: -10px;
            left: 104px;
            font-size: 14px;
            color: rgb(212, 4, 4);
        }
        .redTip {
            border-color: rgb(212, 4, 4) !important;
            .colLabel::before {
                background-color: rgb(212, 4, 4) !important;
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
                text-align: center;
                min-width: 90px;
                padding: 0 10px;
                margin: 4px 0;
                line-height: 25px;
                color: #242424;
                position: relative;
                z-index: 1;
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0px;
                    width: 0.5px;
                    height: 25px;
                    background-color: rgba(205, 205, 205, 0.7);
                }
            }
            .form-control{
                border:none;
                letter-spacing: 2px;
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
    }
}
</style>