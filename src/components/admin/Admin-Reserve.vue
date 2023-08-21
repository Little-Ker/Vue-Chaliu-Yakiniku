<template>
    <div class="member-reserve">
        <h1 class="title">會員訂位紀錄</h1>
        <div class="shopSelect d-flex justify-content-end align-items-center">
            <div class="select-flex d-flex align-items-center">
                <p class="selectTitle fw-700">分店</p>
                <div class="shop-custom-select" tabindex="0" @blur="isOpenShopSelect = false">
                    <div class="selected icon-right-open fw-700" @click="isOpenShopSelect = !isOpenShopSelect">{{ selectShop }}</div>
                    <div class="items" :class="{selectHide: !isOpenShopSelect}">
                        <div v-for="(shop, i) in shopPointData" :key="i" class="item fw-700 d-flex" :class="{'selectPick':selectSameOption(selectShop, shop.shopName)}" @click="clickShopSelect(shop)">
                            {{ shop.shopName }}
                        </div>
                    </div>
                </div> 
            </div>
            <div class="select-flex d-flex align-items-center">
                <p class="selectTitle fw-700">日期</p>
                <div class="shop-custom-select date-custom-select" tabindex="0" @blur="isOpenDateSelect = false">
                    <div class="selected icon-right-open fw-700" @click="isOpenDateSelect = !isOpenDateSelect">{{ selectDate }}</div>
                    <div class="items" :class="{selectHide: !isOpenDateSelect}">
                        <div v-for="(date, i) in ordersDate" :key="i" class="item fw-700 d-flex" :class="{'selectPick':selectSameOption(selectDate, date)}" @click="clickDateSelect(date)">
                            {{ date }}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="d-flex mb-3" @click="goTop();">
            <div v-for="(status, index) in statusObj" :key="index" :class="{'active': statusObj[index].statusBool}" class="choose" @click="resetChoose(status,index);clickChooseType(index);">
                {{status.statusName}}
            </div>
        </div>
        <div v-for="(item, index) in newMemberReseveData" :key="index" class="order">
            <div v-if="!statusObj.isShowNowOrder.statusBool" class="btn-close" @click="clickDeleteBtn(item.OID)"></div>
            <div class="shop">
                <p class="name">茶六燒肉堂 - {{item.shopName}}</p>
            </div>
            <p class="fw-700 data d-flex mb-1">
                <span :class="{'main-brow-text': statusObj.isShowNowOrder.statusBool}" class="icon-dot"></span>
                <span class="mr-2">訂位者:</span>
                <span>{{item.memberName}}</span>
            </p>
            <p class="fw-700 data d-flex mb-1">
                <span :class="{'main-brow-text': statusObj.isShowNowOrder.statusBool}" class="icon-dot"></span>
                <span class="mr-2">手機號碼:</span>
                <span>{{item.cellphone}}</span>
            </p>
            <div class="fw-700 data d-flex mb-1">
                <p class="mr-2">
                    <span :class="{'main-brow-text': statusObj.isShowNowOrder.statusBool}" class="icon-dot"></span>
                    <span></span>預定時間:
                </p>
                <p class="d-flex time-block">
                    <span class="mr-2 d-block">{{item.date}}</span>
                    <span class="d-block">{{item.time}}</span>
                </p> 
            </div>
            <p class="fw-700 data d-flex mb-1">
                <span :class="{'main-brow-text': statusObj.isShowNowOrder.statusBool}" class="icon-dot"></span>
                <span class="mr-2">預定人數:</span>
                <span>{{item.people}}人</span>
            </p>
            <div :class="[{'orderStatus': !statusObj.isShowNowOrder.statusBool}, {'mt-4': statusObj.isShowNowOrder.statusBool}]" class="d-flex justify-content-bewteen">
                <p v-if="!statusObj.isShowNowOrder.statusBool" class="align-self-end main-white-888">於 {{item.bookDate}} 預約</p>
                <div v-if="statusObj.isShowNowOrder.statusBool" class="w-100 d-flex btn-list justify-content-end">
                    <button class="borderBtn active">預約中</button>
                    <button class="borderBtn" @click="clickOverBtn(item.OID)">已用餐</button>
                    <button class="borderBtn" @click="clickCancelBtn(item.OID)">取消</button>
                </div>
                <p v-if="!statusObj.isShowNowOrder.statusBool" class="statusTxt fw-700">{{item.status}}</p>
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
      memberReseveData: [],
      newMemberReseveData: [],
      shopPointData: shopPointData.shop,
      statusObj: {
        isShowNowOrder: {
          statusName: '訂位中',
          statusBool: true,
        },
        isShowOverOrder: {
          statusName: '已用餐',
          statusBool: false,
        },
        isShowCancelOrder: {
          statusName: '已取消',
          statusBool: false,
        },
      },
      selectShop: shopPointData.shop[0].shopName,
      isOpenShopSelect: false,
      selectDate: '所有日期',
      isOpenDateSelect: false,
      isLoadingOver: false,
    }
  },
  computed: {
    ordersDate() {
      // '日期時間降序'
      //     return this.orders.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
      // '日期時間升序'
      // this.orders.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
      const dateAry = []
      const allTxt = '所有日期'
      this.memberReseveData.forEach((order) => {
        if (dateAry.indexOf(order.date) === -1 && this.selectShop === order.shopName) {
          Object.keys(this.statusObj).forEach((status) => {
            if (this.statusObj[status].statusBool && order.status === this.statusObj[status].statusName) {
              dateAry.push(order.date)
            }
          })
        }
      })
      // 日期升序
      dateAry.sort((a, b) => a.localeCompare(b)).unshift(allTxt)
      return dateAry
    },
    selectSameOption() {
      return function(selectShopName, shopName) {
        return selectShopName === shopName
      }
    },
  },
  created() {
    this.getShopOrderData()
  },
  methods: {
    orders() {
      const orderList = []
      this.memberReseveData.forEach((order) => {
        if (this.selectShop === order.shopName && (this.selectDate === '所有日期' || this.selectDate === order.date)) {
          Object.keys(this.statusObj).forEach((status) => {
            if (this.statusObj[status].statusBool && order.status === this.statusObj[status].statusName) {
              orderList.push(order)
            }
          })
        }
      })    
      // 日期時間升序
      if (this.statusObj.isShowNowOrder.statusBool) {
        orderList.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      } else {
        // 日期時間降序
        orderList.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time))
      }

      this.newMemberReseveData = orderList
    },
    resetChoose() {
      Object.keys(this.statusObj).forEach((status) => {
        this.statusObj[status].statusBool = false
      })
      this.selectDate = '所有日期'
    },
    clickChooseType(index) {
      this.statusObj[index].statusBool = true
      this.getShopOrderData()
    },
    clickShopSelect(shop) {
      this.selectShop = shop.shopName
      this.selectDate = '所有日期'
      this.isOpenShopSelect = false
      this.getShopOrderData()
    },
    clickDateSelect(date) {
      this.selectDate = date
      this.isOpenDateSelect = false
      this.getShopOrderData()
    },
    clickCancelBtn(OID) {
      this.updateOrderStatusFn(OID, '已取消')
      this.$store.dispatch('updateNoticeText', '取消預約成功')
    },
    clickOverBtn(OID) {
      this.updateOrderStatusFn(OID, '已用餐')
      this.$store.dispatch('updateNoticeText', '已用餐成功')
    },
    clickDeleteBtn(OID) {
      this.$store.dispatch('updateIsShowLoading', 0)
      const deleteOrderApi = process.env.VUE_APP_A_DELETE_ORDER
      this.axios.post(deleteOrderApi, {
        'OID': OID,
      }).then((response) => {
        this.$store.dispatch('updateIsShowLoading', 1)
        this.isLoadingOver = true
        this.getShopOrderData()
        this.$store.dispatch('updateNoticeText', '紀錄刪除成功')
        this.$store.dispatch('updateIsShowNotice', true)
      }).catch(function(error) {
        console.log('error',error)
      })
    },
    updateOrderStatusFn(OID, status) {
      this.$store.dispatch('updateIsShowLoading', 0)
      const updateOrderStatusApi = process.env.VUE_APP_UPDATE_ORDER_STATUS
      this.axios.post(updateOrderStatusApi, {
        'OID': OID,
        'newStatus': status,
      }).then((response) => {
        this.$store.dispatch('updateIsShowLoading', 1)
        this.isLoadingOver = true
        this.getShopOrderData()
        this.$store.dispatch('updateIsShowNotice', true)
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
    getShopOrderData() {
      if(!this.isLoadingOver) this.$store.dispatch('updateIsShowLoading', 0)
      const showShopOrderListApi = process.env.VUE_APP_A_SHOW_SHOP_ORDER_INFO
      this.axios.post(showShopOrderListApi, {
        'shopName': this.selectShop,
      }).then((response) => {
        this.$store.dispatch('updateIsShowLoading', 3)
        this.isLoadingOver = false
        const backData = response.data
        if (backData.status === 'success') {
          this.memberReseveData = backData.result
        } else {
          this.memberReseveData = []
        }
        this.orders()
      }).catch(function(error) {
        console.log('error',error)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.member-reserve {
    .title {
        padding-left: 30px;
        font-size: 24px;
        font-weight: 700;
    }
    .txt {
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
        position: relative;
        padding: 35px 20px;
        border-bottom: 1px dashed $main-light-blue-text;
        .btn-close {
            right: 10px;
            margin-top: -4px;
            transition: .3s;
            &:hover {
               &::after, &::before {
                   background-color: #000;
                   box-shadow: none;
               }
            }
            &::after, &::before {
                height: 3px;
                width: 28px;
                background-color: #7d7d7d;
            }
        }
        .icon-dot {
            font-size: 20px;
            margin-left: -8px;
        }
        .shop {
            margin-bottom: 15px;
            .name {
                font-size: 18px;
                font-weight: 700;
            }
        }
        .borderBtn {
            border: 1px solid $main-brow-text;
            background-color: transparent;
            color: $main-brow-text;
            margin-left: 15px;
            width: 100px;
            height: 43px;
            transition: .2s all;
            text-align: center;
            letter-spacing: 1px;
            &:hover, &.active {
                background-color: $main-brow-text;
                color: $main-white-text;
            }
        }
        .orderStatus {
            margin-top: 31px;
            position: relative;
            .statusTxt {
                position: relative;
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
    .shopSelect {
        margin: 55px 0 40px 0;
        .selectTitle {
            margin: 0 15px;
        }
    }
    .shop-custom-select {
        outline: none;
        position: relative;
        width: 150px;
        line-height: 43px;
        letter-spacing: 1px;
        &.date-custom-select {
            width: 160px;
        }
        .selected {
            background-color: #fff;
            border: 1px solid $main-white-555;
            border-radius: 5px;
            padding-left: 23px;
            cursor: pointer;
            &::before {
                font-size: 13px;
                position: absolute;
                right: 12px;
                top: 33%;
                transform: rotate(90deg);
            }
        }
        .items {
            background-color: #fff;
            border-radius: 0px 0px 6px 6px;
            border: 1px solid $main-white-555;
            border-top: 0;
            position: absolute;
            box-shadow: rgb(0 0 0 / 10%) 0px 8px 10px;
            overflow: hidden;
            left: 0;
            right: 0;
            top: 40px;
            padding-top: 5px;
            z-index: 2;
            &.selectHide {
                display: none;
            }
            .item {
                color: #858586;
                padding-left: 25px;
                cursor: pointer;
                &:hover, &.selectPick{
                    background-color: $main-white-555;
                    color: #fff;
                }
            }
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
            padding: 35px 5px;
        }
        .shopSelect  {
            margin: 50px 0 20px 0;
            .selectTitle {
                margin: 0 10px;
                font-size: 16px;
            }
        } 
        .shop-custom-select {
            margin-bottom: 7px;
            font-size: 16px;
            width: 140px !important;
            line-height: 37px;
            .selected {
                padding-left: 17px;
            }
            .items {
                top: 32px;
                .item{
                    padding-left: 17px;
                }
            }
        }
        .date-custom-select .items .item {
            padding-left: 0;
            justify-content: center;
            &:first-child {
                padding-left: 17px;
                justify-content: flex-start;
            }
        }
    }
    @media(max-width:500px){
        .btn-list {
            justify-content: flex-start !important;
        }
        .order .borderBtn {
            margin: 0 10px 0 0;
        }
    }
    @media(max-width:477px){
        .select-flex {
            flex-direction: column;
            margin-left: 5px;
            align-items: flex-start !important;
        }
    }      
    @media(max-width:430px){
        .time-block {
            flex-direction: column;
        }
        .data {
            margin: 5px 0;
        }
    }
    @media(max-width:320px){
        .shop-custom-select {
            width: 120px !important;
            .selected {
                padding-left: 10px; 
                &::before {
                    right: 4px;
                }
            }
        }
        .date-custom-select .items .item {
            padding-left: 0 !important;
            &:first-child {
                padding-left: 10px !important; 
            }
        }
    }
}
</style>