<template>
    <div class="time d-flex">
        <div v-for="(item, index) in totalTime" :key="index" class="item">
            <div
                class="timeBlock"
                :class="{
                    notChooseTime:setNotChooseTimeClass(item.id),
                    chooseTime: chooseTime.id == item.id,
                }"
                @click="clickTimeFn(item)"
            >
                <p>{{item.period}}<br>{{item.time}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Time',
  props: ['businessTime'],
  data() {
    return {
      chooseTime: '',
      nowTimeAry: [],
    }
  },
  computed: {
    orderMessage() {
      return this.$store.state.orderMessage 
    },
    chooseReserveTimeData() {
      return this.$store.state.chooseReserveTimeData 
    },
    nowTime() {
      return this.$store.state.nowTime
    },
    chooseReserveDateData() {
      return this.$store.state.chooseReserveDateData
    },
    canChooseTime() {
      let time = 9
      const isTodayYear = (this.chooseReserveDateData.dateData.year === new Date().getFullYear())
      const isTodayMonth = (this.chooseReserveDateData.dateData.month === (new Date().getMonth()))
      const isTodayDate = (this.chooseReserveDateData.dateData.date === new Date().getDate())
      if (isTodayYear && isTodayMonth && isTodayDate) {
        time =  this.nowTime
      }
      return time
    },
    setNotChooseTimeClass() {
      return function(time) {
        // 15:00休息
        // const rest15 = (time == 15);
        // 超時
        const overTime = (this.canChooseTime >= time)
        // return (rest15 || overTime);
        return (overTime)
      }
    },
    setTime() {
      return function(timeNum) {
        let period = ''
        if (timeNum <= 10) {
          period = '早上'
        }
        else if (timeNum <= 13) {
          period = '中午'
        } else if (timeNum <= 17) {
          period = '下午'
        } else {
          period = '晚上'
        }
        const clock = `${timeNum} : 00`
        const timeDate = {
          id: timeNum,
          period: period,
          time: clock,
        }
        return timeDate
      }
    },
    totalTime() {
      let allTime = []
      const businessTime = this.businessTime
      for (let i = businessTime.open; i <= businessTime.close; i++) {
        // 11 13 15 17 19 21
        if (i % 2 == 1) {
          allTime.push(this.setTime(i))
        }
      }
      return allTime
    },
  },
  watch: {
    chooseReserveDateData: {
      handler() {
        this.alreadyChooseTime()
      },
      deep: true,
    },
  },
  mounted() {
    this.alreadyChooseTime()
  },
  methods: {
    getNowChooseTime() {
      this.nowTimeAry = []
      const businessTime = this.businessTime
      for (let i = businessTime.open; i <= businessTime.close; i++) {
        if (i % 2 == 1 && !this.setNotChooseTimeClass(i)) {
          this.nowTimeAry.push(this.setTime(i))
        }
      }
      return this.nowTimeAry
    },
    sendChooseTime() {
      this.$store.dispatch('updateChooseReserveTimeData', this.chooseTime)
    },
    clickTimeFn(item) {
      if (this.setNotChooseTimeClass(item.id)) return
      this.chooseTime = item
      this.sendChooseTime()
    },
    chooseNowTime() {
      const getNowChooseTimeAry = this.getNowChooseTime()
      if (getNowChooseTimeAry.length == 0) return
      this.chooseTime = getNowChooseTimeAry[0] 
      this.sendChooseTime()
    },
    alreadyChooseTime() {
      const alreadyTime = this.chooseReserveTimeData
      if (alreadyTime === '') {
        this.chooseNowTime()
        return
      }
      const timeDate = {
        id: alreadyTime.id,
        period: alreadyTime.period,
        time: alreadyTime.time,
      }
      this.chooseTime = timeDate
      this.sendChooseTime()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.time {
    color: $main-white-text;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
        width: calc(100% / 6 - 10px);
        margin-top: 5px;
        .timeBlock {
            &.notChooseTime p {
                cursor: auto !important;
                color: $main-white-333;
                border-color: $main-white-333;
            }
            p {
                cursor: pointer;
                text-align: center;
                border: 1px solid #999;
                line-height: 24px;
                padding: 5px 10px;
            }
        }
        .chooseTime {
            background-color: #d0d0d04d;
            color: #fff;
        }
    }

    @media(max-width:576px){
        flex-wrap: wrap;
        justify-content: flex-start;
        .item {
            width: 90px;
            margin: 0 10px 5px 0;
        }
    }
    @media(max-width:375px){
        flex-wrap:nowrap;
        justify-content: space-between;
        .item {
            margin: 0;
            width: calc(100% / 6 - 5px);
        }
    }
}
</style>