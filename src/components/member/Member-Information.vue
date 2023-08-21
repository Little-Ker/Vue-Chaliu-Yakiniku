<template>
    <div class="member-information">
        <div class="form-section pos-relative">
            <p class="title fw-700">帳戶資料</p>
            <form action="member-form" autocomplete="off" class="position-relative" @submit.prevent="clickStoreBtn">
                <div class="form choose-select">
                    <div class="formBox d-flex flex-direction-column">
                        <label for="contactName" class="colLabel">姓名</label>
                        <input id="contactName" v-model="name" type="text" placeholder="請輸入真實姓名" maxlength="5" autoComplete="off" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <div class="formBox d-flex flex-direction-column">
                        <label for="contactCellphone" class="colLabel">手機</label>
                        <input id="contactCellphone" v-model="cellphone" type="text" placeholder="請輸入手機號碼" maxlength="10" autoComplete="off" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
                    <div class="formBox d-flex flex-direction-column">
                        <label for="contactEmail" class="colLabel">信箱</label>
                        <input id="contactEmail" v-model="email" type="email" placeholder="請輸入電子信箱" maxlength="10" autoComplete="off" class="form-control" required @keydown="keydownNull($event)" @focus="focusInputFn" @blur="blurInputFn">
                    </div>
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
export default {
  data() {
    return {
      name: '',
      cellphone: '',
      email: '',
    }
  },
  computed: {
    memberId() {
      return this.$store.state.memberId
    },
  },
  mounted() {
    this.clickCancelBtn()
  },
  methods: {
    clickStoreBtn() {
      this.$store.dispatch('updateIsShowLoading', 0)
      const memberUpdateInfoApi = process.env.VUE_APP_M_UPDATE_INFO
      this.axios.post(memberUpdateInfoApi, {
        'MID': this.memberId,
        'newName': this.name,
        'newCellphone': this.cellphone,
        'newEmail': this.email,
      }).then(() => {
        this.$store.dispatch('updateIsShowLoading', 1)
        this.storeMemberDataSucFn()
      }).catch(function(error) {
        console.log('error',error)
      }) 
    },
    storeMemberDataSucFn() {
      this.$store.dispatch('updateMemberName', this.name)
      this.$store.dispatch('updateMemberCellphone', this.cellphone)
      this.$store.dispatch('updateMemberEmail', this.email)
      // 修改成功訊息
      this.$store.dispatch('updateIsShowNotice', true)
      this.$store.dispatch('updateNoticeText', '資料修改成功')
    },
    clickCancelBtn() {
      this.name = this.$store.state.memberName
      this.cellphone = this.$store.state.memberCellphone
      this.email = this.$store.state.memberEmail
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

.member-information {
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
            .form-control {
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
        }
    }  
}
</style>