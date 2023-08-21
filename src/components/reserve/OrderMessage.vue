<template>
    <div class="orderMessage">
        <div class="container-620 w-100 d-flex flex-direction-col">
            <div class="form-group d-flex flex-direction-col">
                <p class="main-white-text form-title">訂位資訊</p>
                <div class="main-white-text form-data form-data-2">
                    <p class="icon-location data-title">
                        <span class="data-title-2">分店：</span>
                        <span class="fw-700">{{orderMessage.shop}}</span>
                    </p>
                    <p class="icon-user data-title">
                        <span class="data-title-2">人數：</span>
                        <span class="fw-700">{{orderMessage.people}} 位</span>
                    </p>
                    <div class="d-flex time-flex">
                        <p class="icon-stopwatch data-title">
                            <span class="data-title-2">用餐時間： </span>
                        </p>
                        <div class="time-data"> 
                            <p class="fw-700">{{orderMessage.date}}  <span class="data-day">{{orderMessage.day}}</span></p>
                            <p class="fw-700">{{orderMessage.time.period}} {{orderMessage.time.time}}</p>
                        </div>
                    </div>
                </div>
                <a class="reviseBtn align-self-end" @click="preStepFn()">
                    <span class="main-brow-text fw-700 transition-0-3">修改資訊</span>
                    <span class="main-brow-text icon-pencil transition-0-3"></span>
                </a>
            </div>
            <form action="login-form" autoComplete="off" @submit.prevent="nextStepFn()">
                <div class="form-group">
                    <p class="main-white-text form-title">訂位者資訊</p>
                    <div class="main-white-text form-data">
                        <p class="icon-user data-title">
                            <span class="data-title-2">聯絡人：</span>
                            <input v-model="contact.name" type="text" maxlength="5" autoComplete="off" required @keydown="keydownNull($event)">
                        </p>
                        <p class="icon-phone data-title">
                            <span class="data-title-2">電話：</span>
                            <input v-model="contact.cellphone" type="tel" maxlength="10" autoComplete="off" required @keydown="keydownNull($event)">
                        </p>
                        <p class="icon-mail data-title">
                            <span class="data-title-2">信箱：</span>
                            <input v-model="contact.mail" type="email" maxlength="10" autoComplete="off" required @keydown="keydownNull($event)">
                        </p>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn-border align-self-end">
                        <span class="btn-border-text fw-700 transition-0-3">送出預約單</span>
                    </button>
                </div>
            </form>     
        </div>
    </div>
</template>

<script>
export default {
  name: 'OrderMessage',
  data() {
    return {
      contact: {
        name: '',
        cellphone: '',
        mail: '',
      },
    }
  },
  computed: {
    orderMessage() {
      return this.$store.state.orderMessage
    },
    memberName() {
      return this.$store.state.memberName
    },
    memberCellphone() {
      return this.$store.state.memberCellphone
    },
    memberEmail() {
      return this.$store.state.memberEmail
    },
    memberId() {
      return this.$store.state.memberId
    },
    getBookTime() {
      const date = new Date()
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
  },
  mounted() {
    this.$store.dispatch('updateIsShowLoading', true)
    this.contact = {
      name: this.memberName,
      cellphone: this.memberCellphone,
      mail: this.memberEmail,
    }
  },
  methods: {
    preStepFn() {
      this.$store.dispatch('updateOrderLevel', 1)
      this.goTop()
    },
    nextStepFn() {
      const contact = {
        name: this.contact.name,
        cellphone: this.contact.cellphone,
        mail: this.contact.mail,
      }
      this.goTop()
      this.sendOrder(contact)
    },
    sendOrder(contact) {
      this.$store.dispatch('updateIsShowLoading', 0)
      const memberAddOrder = process.env.VUE_APP_M_ADD_ORDER
      this.axios.post(memberAddOrder, {
        'MID': this.memberId,
        'memberName': contact.name,
        'cellphone': contact.cellphone,
        'email': contact.mail,
        'shopName': this.orderMessage.shop,
        'date': this.orderMessage.date,
        'time': `${this.orderMessage.time.period} ${this.orderMessage.time.time}`,
        'people': this.orderMessage.people,
        'bookDate': this.getBookTime,
        'status': '訂位中',
      }).then((response) => {
        this.addOrderSucFn()
        this.$store.dispatch('updateIsShowLoading', 3)
      }).catch(function(error) {
        console.log('error',error)
      })
    },
    addOrderSucFn() {
      this.$store.dispatch('updateOrderLevel', 3)
      this.goTop()
    },
    goTop() {
      $('html,body').scrollTop(0, 0)
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

.orderMessage {
    margin-top: 20px;
    .form-group {
        margin-bottom: 50px;
        position: relative;
        border: 1px solid #fff;
        .form-title {
            font-size: 18px;
            margin-top: 8px;
            letter-spacing: 3px;
            padding: 0 10px;
            position: absolute;
            top: -20px;
            left: 20px;
            background-color: rgb(44,38,38);
            border-radius: 50%;
        }
        .form-data {
            padding: 30px 30px 25px 30px;
            &.form-data-2 {
                padding-bottom: 0;
            }
            .data-title { 
                margin-bottom: 15px;
                &::before {
                    margin-right: 8px;
                }
            }
            .data-title-2 {
                margin-right: 8px;
            }
            input {
                background-color: rgba(255, 255, 255, 0.1);
                color: #fff;
                width: 100%;
                padding: 3px 30px;
                border: none;
                outline: 0;
                letter-spacing: 2px;
                font-weight: 700;
            }
            p {
                font-size: 18px;
                line-height: 30px;
                letter-spacing: 2px;
                font-family: "Courier New", Courier, monospace;
            }
        }
        .reviseBtn {
            cursor: pointer;
            padding: 5px;
            margin: 0 15px 20px 10px;
            &:hover {
                span {
                    color: $main-white-text;
                }
            }
        }
    }
    .btn-border {
        width: 240px;
        height: 55px;
        margin: 0;
        letter-spacing: 3px;
    }

    @media(max-width:500px){
        .form-group .reviseBtn {
            margin: 20px 15px 20px 10px;
        }
        .icon-stopwatch {
            flex-shrink: 0;
        }
        .data-day {
            display: block;
        }
        .btn-border {
            width: 200px;
        }
    }
    @media(max-width:390px){
        .form-group {
            padding: 30px 20px 20px 20px;
            .form-data {
                padding: 0;
            }
            .reviseBtn {
                margin: 10px 0 0 0;
            }
        }
    }
    @media(max-width:355px){
        .time-flex {
            flex-wrap: wrap;
        }
        .icon-stopwatch {
            width: 100%;
            margin-bottom: 0 !important;
        }
        .time-data {
            margin-left: 30px;
        }
    }
}
</style>
