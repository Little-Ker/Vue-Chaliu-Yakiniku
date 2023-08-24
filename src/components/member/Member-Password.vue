<template>
    <div class="member-password">
        <div class="form-section pos-relative">
            <p class="title fw-700">更改密碼</p>
            <form action="member-form" autocomplete="off" class="position-relative" @submit.prevent="clickStoreBtn">
                <div class="form choose-select">
                    <div :class="{'redTip': isShowOldTip}" class="formBox d-flex flex-direction-column">
                        <label for="editOldPwd" class="colLabel">舊密碼</label>
                        <input id="editOldPwd" v-model="oldPwd" type="password" maxlength="10" autoComplete="off" placeholder="請輸入舊密碼" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <p v-if="isShowOldTip" :class="{'redTip':isShowOldTip}" class="tip">*舊密碼輸入錯誤</p>
                    <div class="formBox d-flex flex-direction-column">
                        <label for="editNewPwd" class="colLabel">新密碼</label>
                        <input id="newPwd" v-model="newPwd" type="password" minlength="5" maxlength="10" autoComplete="off" placeholder="請輸入至少5個字元" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <div :class="{'redTip': isShowNewTip}" class="formBox d-flex flex-direction-column">
                        <label for="editCheckPwd" class="colLabel">確認新密碼</label>
                        <input id="checkNewPwd" v-model="checkPwd" type="password" maxlength="10" autoComplete="off" placeholder="請重複輸入新密碼" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <p v-if="isShowNewTip" :class="{'redTip':isShowNewTip}"  class="tip">*新密碼重複輸入錯誤</p>
                </div>
                <div class="d-flex mt-5 justify-content-end">
                    <a class="btn cancel d-flex justify-content-center align-items-center main-blue-text" @click="clickCancelBtn">
                        <span>取消變更</span>
                    </a>
                    <button type="submit" class="btn d-block text-align-center">
                        <span>儲存變更</span>
                    </button>
                </div>
            </form>
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
      oldPwd: '',
      newPwd: '',
      checkPwd: '',
      isShowOldTip: false,
      isShowNewTip: false,
    }
  },
  computed: {
    currentPwd() {
      return this.$store.state.memberPassword
    },
    memberId() {
      return this.$store.state.memberId
    },
  },
  unmounted() {
    this.clickCancelBtn()
  },
  methods: {
    clickStoreBtn() {
      this.resetTip()
      if (this.oldPwd !== this.currentPwd) {
        this.isShowOldTip = true
        this.showFalseAnim()
        return
      }
      if (this.newPwd !== this.checkPwd) {
        this.isShowNewTip = true
        this.showFalseAnim()
        return
      }
      this.$store.dispatch('updateIsShowLoading', 0)
      const memberUpdatePwdApi = process.env.VUE_APP_M_UPDATE_PWD
      this.axios.post(memberUpdatePwdApi, {
        'MID': this.memberId,
        'newPassword': this.newPwd,
      }).then((response) => {
        this.$store.dispatch('updateIsShowLoading', 1)
        const backData = response.data
        if (backData.status === 'success') {
          this.updatePwdSucFn()
        } else {
          this.showFalseAnim()
        }
      }).catch(function(error) {
        console.log('error',error)
      })
    },
    updatePwdSucFn() {
      this.$store.dispatch('updateMemberPassword', this.newPwd)
      cookies.set('pwd', this.newPwd, '6h')
      this.clickCancelBtn()
      // 修改成功訊息
      this.$store.dispatch('updateIsShowNotice', true)
      this.$store.dispatch('updateNoticeText', '密碼修改成功')
    },
    showFalseAnim() {
      $('.message').addClass('animate_headShake')
      $('.message').on('webkitAnimationEnd', function(){
        $('.message').removeClass('animate_headShake')
      })
    },
    resetTip() {
      this.isShowOldTip = false
      this.isShowNewTip = false
    },
    clickCancelBtn() {
      this.oldPwd = ''
      this.newPwd = ''
      this.checkPwd = ''
      this.resetTip()
    },
    focusInputFn(el) {
      $(el.target).closest('.formBox').addClass('inputFocus')
    },
    blurInputFn(el) {
      $(el.target).closest('.formBox').removeClass('inputFocus')
    },
    // 禁止輸入空格
    keydownNull(e){
      if(e.keyCode == 32){
        e.returnValue = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.member-password {
    .form-section {
        .title {
            font-size: 24px;
            margin-bottom: 40px;
        }
        .btn {
            width: 160px;
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
            width: auto;
            background-color: #fff;
            border: 1px solid $main-blue-text;
            color: $main-blue-text;
            margin-right: 20px;
            &:hover {
                background-color: #eeeeee
            }
        }
        .tip {
            position: relative;
            top: -10px;
            left: 110px;
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
            background-color: #fff;
            width: 100%;
            border: solid 1px rgba(205, 205, 205, 0.7);
            display: flex;
            align-items: center;
            position: relative;
            transition: all 0.4s;
            margin-bottom: 20px;
            .colLabel {
                text-align: center;
                min-width: 110px;
                margin: 4px 0;
                line-height: 25px;
                color: #242424;
                position: relative;
                z-index: 1;
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 0.5px;
                    height: 25px;
                    background-color: rgba(205, 205, 205, 0.7);
                }
            }
            .form-control{
                border:none;
                letter-spacing: 2px;
                padding: 0.375rem 1rem;
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

    @media(max-width:880px){
        .form-section .title {
            font-size: 22px;

        }
    }
    @media(max-width:576px){
        .form-section {
            .title {
                font-size: 20px;
            }
            .btn {
                width: 140px;
            }
            .formBox {
                .colLabel {
                    min-width: 100px;
                }
                .form-control {
                    padding: 0 10px;
                }
            }
        }
    }  
}
</style>