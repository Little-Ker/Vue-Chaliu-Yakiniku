<template>
    <div class="member-reserve">
        <h1 class="title">預約紀錄</h1>
        <p class="txt main-white-aaa">- 目前僅提供前十筆紀錄。</p>
        <div class="d-flex mb-3" @click="goTop">
            <div :class="{'active': isShowNowOrder}" class="choose" @click="isShowNowOrder = true;getMemberReseveList();">即將用餐</div>
            <div :class="{'active': !isShowNowOrder}" class="choose" @click="isShowNowOrder = false;getMemberReseveList();">歷史紀錄</div>
        </div>
        <div v-for="(item, index) in newMemberReseveData" :key="index" class="order">
            <div class="shop">
                <p class="name d-flex">茶六燒肉堂 - {{item.shopName}}</p>
                <p class="main-white-aaa d-flex">{{shopAddress(item.shopName)}}</p>
            </div>
            <div class="fw-700 data d-flex">
                <p class="mr-2">
                    <span :class="{'main-brow-text': isShowNowOrder}" class="mr-1 icon-ok"></span>
                    <span></span>預定時間:</p>
                <p class="d-flex time-block">
                    <span class="mr-2 d-block">{{item.date}}</span>
                    <span class="d-block">{{item.time}}</span>
                </p> 
            </div>
            <p class="fw-700 data d-flex">
                <span :class="{'main-brow-text': isShowNowOrder}" class="mr-1 icon-ok"></span>
                <span class="mr-2">訂位人數:</span>
                <span>{{item.people}}人</span>
            </p>
            <p class="fw-700 data d-flex">
                <span :class="{'main-brow-text': isShowNowOrder}" class="mr-1 icon-ok"></span>
                <span class="mr-2">聯絡人:</span>
                <span>{{item.memberName}}</span>
            </p>
            <p class="fw-700 data d-flex">
                <span :class="{'main-brow-text': isShowNowOrder}" class="mr-1 icon-ok"></span>
                <span class="mr-2">手機號碼:</span>
                <span>{{item.cellphone}}</span>
            </p>
            <div :class="[{'orderStatus': !isShowNowOrder}, {'mt-2': isShowNowOrder}]" class="d-flex justify-content-bewteen">
                <p class="recordTime align-self-end main-white-aaa fs-14">於 {{item.bookDate}} 預約</p>
                <a v-if="isShowNowOrder" class="borderBtn" @click="clickCancelBtn(item.OID)">取消預約</a>
                <p v-if="!isShowNowOrder" class="statusTxt fw-700">{{item.status}}</p>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div v-if="newMemberReseveData.length > 1" class="goTop transition-0-3 icon-left-open" @click="goTopScroll"></div>
        </div>
        <div v-if="newMemberReseveData.length === 0" class="noOrder">
            <p class="icon-calendar text-align-center"></p>
            <p class="txt fw-700 text-align-center">目前無任何紀錄</p>
        </div>
    </div>
</template>

<script>
import shopPointData from '@/assets/datas/shopPointData.json'

export default {
  data() {
    return {
      maxDataCount: 10,
      isShowNowOrder: true,
      memberReseveData: [],
      newMemberReseveData: [],
      shopPointData: shopPointData.shop,
      isLoadingOver: false,
    }
  },
  computed: {
    memberId() {
      return this.$store.state.memberId
    },
    shopAddress() {
      const vm = this
      return function (shopName) {
        let address = ''
        vm.shopPointData.forEach((shop) => {
          if(shopName === shop.shopName) {
            address = shop.address
          }
        })
        return address
      }
    },
  },
  mounted() {
    this.getMemberReseveList()
  },
  methods: {
    clickCancelBtn(OID) {
      this.$store.dispatch('updateIsShowLoading', 0)
      const updateOrderStatusApi = process.env.VUE_APP_UPDATE_ORDER_STATUS
      this.axios.post(updateOrderStatusApi, {
        'OID': OID,
        'newStatus': '已取消',
      }).then((response) => {
        this.$store.dispatch('updateIsShowLoading', 1)
        this.isLoadingOver = true
        this.$store.dispatch('updateIsShowNotice', true)
        this.$store.dispatch('updateNoticeText', '取消預約成功')
        this.getMemberReseveList()
      }).catch(function(error) {
        console.log('error',error)
      })
    },
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
    goTopScroll() {
      $('html,body').animate({ scrollTop: (0, 0) }, 'slow')
    },
    getMemberReseveList() {
      if (!this.isLoadingOver) this.$store.dispatch('updateIsShowLoading', 0)
      const memberShowOrderListApi = process.env.VUE_APP_M_SHOW_ORDER_INFO
      this.axios.post(memberShowOrderListApi, {
        'MID': this.memberId,
      }).then((response) => {
        this.$store.dispatch('updateIsShowLoading', 3)
        this.isLoadingOver = false
        if (response.data.status === 'success') {
          this.memberReseveData = response.data.result
        } else {
          this.memberReseveData = []
        }
        this.orders() 
      }).catch(function(error) {
        console.log('error',error)
      })
    },
    orders() {
      const orderList = []
      this.memberReseveData.forEach((order) => {
        if (this.isShowNowOrder && order.status === '訂位中') {
          orderList.push(order)
        }
        if (!this.isShowNowOrder && order.status !== '訂位中') {
          orderList.push(order)
        }
      })
      // '日期時間升序'
      if (this.isShowNowOrder) orderList.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      // '日期時間降序'
      if (!this.isShowNowOrder) orderList.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time))
      if (orderList.length > this.maxDataCount) orderList.length = this.maxDataCount

      this.newMemberReseveData = orderList
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.member-reserve {
    .title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 15px;
    }
    .txt {
        margin-bottom: 60px;
        margin-left: 3px;
    }
    .choose {
        cursor: pointer;
        width: 50%;
        height: 40px;
        text-align: center;
        border-bottom: 1px solid #DCDCDC;
        font-weight: 700;
        &.active {
            border-bottom: 2.5px solid $main-brow-text; 
        }
    }
    .order {
        padding: 35px 20px;
        border-bottom: 1px dashed $main-light-blue-text;
        .shop {
            margin-bottom: 15px;
            .name {
                font-size: 18px;
                font-weight: 700;
            }
        }
        .borderBtn {
            cursor: pointer;
            border: 1px solid $main-brow-text;
            background-color: transparent;
            color: $main-brow-text;
            margin-left: 15px;
            width: 100px;
            height: 43px;
            line-height: 43px;
            transition: .2s all;
            text-align: center;
            letter-spacing: 1px;
            &:hover {
                background-color: $main-brow-text;
                color: $main-white-text;
            }
        }
        .orderStatus {
            margin-top: 31px;
            position: relative;
            .statusTxt {
                &::before {
                    content: '';
                    width: 60px;
                    height: 10px;
                    position: absolute;
                    margin-top: 10px;
                    margin-left: -4px;
                    background-color: #aa83437c;
                }
            }
        }
    }
    .noOrder {
        padding: 120px 0 40px 0;
        .icon-calendar {
            font-size: 64px;
        }
        .txt {
            font-size: 20px;
            margin-top: 30px;
        }
    }
    .goTop {
        cursor: pointer;
        margin-top: 30px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid $main-blue-text;
        position: relative;
        font-size: 24px;
        &::before {
            transform: rotate(90deg);
            position: absolute;
            top: 4px;
        }
        &:hover {
            background-color: $main-blue-text;
            color: #fff;
        }
    }

    @media(max-width:880px){
        .title {
            font-size: 22px;
            padding-left: 0;
        }
        .choose {
            font-size: 18px;
        }
        .order {
            font-size: 17px;
            padding: 35px 5px;
        }
    }
    @media(max-width:576px){
        .title {
            font-size: 20px;
        }
        .choose {
            font-size: 16px;
            text-align: center;
        }
        .order {
            font-size: 16px;
        }
    }   
    @media(max-width:437px){
        .time-block {
            flex-direction: column;
        }
        .data {
            margin: 3px 0;
        }
        .order {
            .mt-2 {
                margin-top: 20px !important;
                justify-content: flex-end !important;
                .recordTime {
                    display: none;
                }
            }
            .shop {
                margin-bottom: 25px;
            }       
        }
    }
}
</style>