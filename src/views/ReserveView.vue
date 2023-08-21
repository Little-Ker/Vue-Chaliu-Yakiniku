<template>
    <div class="reserveView main-bg-img">
        <div class="banner bg-fit" :style="{backgroundImage:'url('+bannerImg+')'}">
            <div class="blackHide">
                <div class="title">
                    <h1 class="main-brow-text">線上訂位系統</h1>
                    <p class="main-brow-text">Reserve System</p>
                </div>
                <div v-if="orderLevel == 1 && isAdminLogin">
                    <OrderFalse></OrderFalse>
                </div>
                <div v-if="orderLevel == 1 && !isAdminLogin">
                    <CreateOrder></CreateOrder>
                </div>
                <div v-if="orderLevel == 2">
                    <OrderMessage></OrderMessage>
                </div>
                <div v-if="orderLevel == 3">
                    <OrderFinish></OrderFinish>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import CreateOrder from '@/components/reserve/CreateOrder.vue'
import OrderMessage from '@/components/reserve/OrderMessage.vue'
import OrderFinish from '@/components/reserve/OrderFinish.vue'
import OrderFalse from '@/components/reserve/OrderFalse.vue'

export default {
  name: 'ReserveView',
  components: {
    CreateOrder,
    OrderMessage,
    OrderFinish,
    OrderFalse,
  },
  data() {
    return {
      bannerImg: require('@/assets/images/reserve/banner.jpg'),
      isAdminLogin: false,
    }
  },
  computed: {
    orderLevel() {
      return this.$store.state.orderLevel
    },
    isLoginSuccess() {
      return this.$store.state.isLoginSuccess
    },
    isAdiminsLogin() {
      return this.$store.state.isAdiminsLogin
    },
  },
  watch: {
    isLoginSuccess() {
      this.loginSucFn()
    },
  },
  mounted() {
    this.loginSucFn()
  },
  unmounted() {
    this.$store.dispatch('updateOrderLevel', 1)
    this.resetData()
  },
  methods: {
    resetData() {
      const resetOrder = {
        shop: '',
        people: '',
        dateData: '',
        date: '',
        time: '',
      }
      this.$store.dispatch('updateOrderMessage', resetOrder)
      const chooseReserveDateData = {
        dateData: '',
        date: '',
        day: '',
      }
      this.$store.dispatch('updateChooseReserveDateData', chooseReserveDateData)
      this.$store.dispatch('updateChooseReserveTimeData', '')
    },
    loginSucFn() {
      if (this.isLoginSuccess && this.isAdiminsLogin) {
        this.isAdminLogin = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.reserveView {
    position: relative;
    .banner {
        background-attachment: fixed;
        height: 100%;
        background-position-y: 43%;
        .blackHide {
            background-color: rgba(8, 10, 15, 0.8);
            padding: 140px 0;
            display: flex;
            flex-direction: column;
        }
        .title {
            align-self: center;
            margin-bottom: 30px;
            h1 {
                font-size: 32px;
            }
            p {
                position: relative;
                font-size: 16px;
                padding-top: 3px;
                padding-bottom: 30px;
                &::before {
                    content: '';
                    width: 30px;
                    height:1px;
                    background-color: #aa8243;
                    position: absolute;
                    left: calc((100% - 30px) / 2);
                    bottom: 0;
                }
            }
        }
    }

    @media(max-width:710px){
        .title h1 {
            font-size: 32px !important;
        }
    }
    @media(max-width:530px){
        .title h1 {
            font-size:28px !important;
        }
        .banner .blackHide {
            padding: 110px 0 100px 0;
        }
    }
}
</style>
