<template>
    <div class="calendar">
        <div class="d-flex justify-content-between">
            <p class="icon-left-open show-cursor-pointer" :class="{'hideOpcity':calendarMonth == todayMonth} " @click="clickMonthBtn(-1);"></p>
            <p class="title text-center main-white-text align-self-center">{{calendarYear}}年 {{setZero(calendarMonth + 1)}}月</p>
            <p class="icon-right-open show-cursor-pointer" :class="{'hideOpcity':calendarMonth == getNextMonth(todayMonth)}" @click="clickMonthBtn(1);"></p>
        </div>
        <div class="weekDay d-flex w-100">
            <div class="day">
                <p>日</p><p class="dayEng">SUN</p>
            </div>
            <div class="day">
                <p>一</p><p class="dayEng">MON</p>
            </div>
            <div class="day">
                <p>二</p><p class="dayEng">TUS</p>
            </div>
            <div class="day">
                <p>三</p><p class="dayEng">WED</p>
            </div>
            <div class="day">
                <p>四</p><p class="dayEng">THU</p>
            </div>
            <div class="day">
                <p>五</p><p class="dayEng">FRI</p>
            </div>
            <div class="day">
                <p>六</p><p class="dayEng">SAT</p>
            </div>
        </div>
        <div v-for="i in getWeekCount" :key="i" class="week d-flex">
            <div
                v-for="j in 7" :key="j"
                class="date"
                :class="{ today:setTodayClass(i, j), other:setOtherClass(i, j),
                          canChooseDay:setCanChooseDayClass(i, j), notChooseDay:setNotChooseDayClass(i, j),
                          chooseDay: calendarMonthCalc[(i-1)*7+j-1].year === chooseDayYear && calendarMonthCalc[(i-1)*7+j-1].month === chooseDayMonth && calendarMonthCalc[(i-1)*7+j-1].date === chooseDayDate,
                }" @click="chooseDateFn(i, j, calendarMonthCalc[(i-1)*7+j-1])"
            >
                <p>{{calendarMonthCalc[(i-1)*7+j-1].date}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: ['businessTime'],
  data() {
    return {
      todayYear: 0,
      todayMonth: 0,
      todayDate: 0,
      todayDay: 0,
      chooseDayYear: 0,
      chooseDayMonth: 0,
      chooseDayDate: 0,
      chooseDayDay: 0,
      calendarYear: 0,
      calendarMonth: 0,
      calendarDate: 0,
      calendarDay: 0,
      isCanChooseToday: false,
    }
  },
  computed: {
    orderMessage() {
      return this.$store.state.orderMessage 
    },
    nowTime() {
      return this.$store.state.nowTime
    },
    setCalendarData() {
      return function(i, j) {
        return this.calendarMonthCalc[(i-1)*7+j-1]
      }
    },
    setTodayClass() {
      return function(i, j) {
        const calendar = this.setCalendarData(i, j)
        return calendar.year === this.todayYear && calendar.month === this.todayMonth && calendar.date === this.todayDate
      }
    },
    setOtherClass() {
      return function(i, j) {
        const calendar = this.setCalendarData(i, j)
        return calendar.month !== this.calendarMonth
      }
    },
    setCanChooseDayClass() {
      return function(i, j) {
        if (this.setNotChooseDayClass(i, j)) return false
        const calendar = this.setCalendarData(i, j)
        return true
      }
    },
    setNotChooseDayClass() {
      return function(i, j) {
        const calendar = this.setCalendarData(i, j)
        // 星期一公休
        // if (calendar.day == 1) return true;
        // 非這個月
        if ((calendar.month != this.todayMonth) && (calendar.month != this.getNextMonth(this.todayMonth))) return true
        // 今天已不可選
        if (!this.isCanChooseToday && calendar.year == this.todayYear && calendar.month == this.todayMonth && calendar.date == this.todayDate) return true
        // 當月今天之前、下個月今天之後
        const monthDate = (calendar.month == this.todayMonth && calendar.date < this.todayDate)
        const nextMonthDate = (calendar.month == this.getNextMonth(this.todayMonth) && calendar.date >= this.todayDate)
        return (monthDate || nextMonthDate)
      }
    },
    getWeekCount() {
      let chooseMonth = ''
      let monthCount = 0
      this.calendarMonthCalc.forEach((item) => {
        // eslint-disable-next-line no-plusplus
        if (chooseMonth === item.month || chooseMonth === '') monthCount++ 
        if (item.date === 1 && chooseMonth === '') chooseMonth = item.month
      })
      monthCount = (monthCount / 7)
      if (monthCount % 1 !== 0) return (Math.trunc(monthCount) + 1)
      return monthCount
    },
    setZero() {
      return function(num) {
        if (num < 10) {
          return `0${num}`
        } return num
      }
    },
    setDay() {
      return function(day) {
        const weekAry = [  '日', '一', '二', '三', '四', '五', '六' ]
        return weekAry[day]
      }
    },
    setChooseDay() {
      return function(year, month, date) {
        return `${year}-${this.setZero(month + 1)}-${this.setZero(date)}`
      }
    },
    getNextMonth() {
      return function(month) {
        let nextMonth = month + 1
        if (nextMonth > 11) nextMonth = 0
        return nextMonth
      }
    },
    calendarFirstDay(){
      const mDate = new Date(this.calendarYear,this.calendarMonth,1)
      const date = new Date(this.calendarYear,this.calendarMonth,1 - mDate.getDay())
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
      }
    },
    calendarMonthCalc() {
      const data = []
      let date
      for(let i = 0; i < 42; i++){
        date = new Date(this.calendarFirstDay.year,this.calendarFirstDay.month,this.calendarFirstDay.date + i)
        data.push({
          year: date.getFullYear(),
          month: date.getMonth(),
          date: date.getDate(),
          day: date.getDay(),
        })
      }
      // console.log(data);
      return data
    },
  },
  created() {
    this.setToday()
  },
  mounted() {
    this.getChooseDay()
    this.alreadyChooseDate()
    this.sendChooseDate()
  },
  methods: {
    sendChooseDate() {
      const chooseYear = this.chooseDayYear
      const chooseMonth = this.chooseDayMonth
      const chooseDate = this.chooseDayDate
      const chooseDay = this.chooseDayDay
      const dayData = {
        year: chooseYear,
        month: chooseMonth,
        date: chooseDate,
        day: chooseDay,
      }

      const chooseDayData = {
        dateData: dayData,
        date: this.setChooseDay(chooseYear, chooseMonth, chooseDate),
        day: `星期${this.setDay(chooseDay)}`,
      }
      this.$store.dispatch('updateChooseReserveDateData', chooseDayData)
    },
    chooseDateFn(i, j, chooseDateData) {
      if(this.setNotChooseDayClass(i, j) || this.setOtherClass(i, j)) return
      this.chooseDayYear = chooseDateData.year
      this.chooseDayMonth = chooseDateData.month
      this.chooseDayDate = chooseDateData.date
      this.chooseDayDay = chooseDateData.day
      this.$store.dispatch('updateChooseReserveTimeData', '')

      this.isSameDate()
      this.getNowTime()
      this.sendChooseDate()
    },
    getNowTime() {
      if (this.nowTime >= this.businessTime.close) {
        this.$store.dispatch('updateNowTime', (this.businessTime.open - 1))
        return 1
      }
      return 0
    },
    isSameDate() {
      if (this.todayDate !== this.chooseDayDate) {
        this.$store.dispatch('updateNowTime', (this.businessTime.open - 1))
        return
      }
      const newTime = new Date().getHours()
      this.$store.dispatch('updateNowTime', newTime)
    },
    setToday() {
      const date = new Date()
      this.todayYear = this.calendarYear = date.getFullYear()
      this.todayMonth = this.calendarMonth  = date.getMonth() // 0~11月
      this.todayDate = this.calendarDate  = date.getDate()
      this.todayDay = this.calendarDay  = date.getDay()
    },
    getChooseDay() {
      const addDay = this.getNowTime()
      const date = new Date(new Date().getTime() + addDay * 24 * 60 * 60 * 1000)
      this.chooseDayYear = date.getFullYear()
      this.chooseDayMonth = date.getMonth() // 0~11月
      this.chooseDayDate = date.getDate()
      this.chooseDayDay = date.getDay()
      this.calendarMonth = this.chooseDayMonth

      if (this.chooseDayYear === this.todayYear && this.chooseDayMonth === this.todayMonth && this.chooseDayDate === this.todayDate) {
        this.isCanChooseToday = true
      }
    },
    changeYear(fix) {
      this.calendarYear += fix
    },
    changeMonth(fix) {
      let month = this.calendarMonth + fix
      if(month > 11) {
        this.changeYear(1)
        this.calendarMonth = 0
      } else if (month < 0){
        this.changeYear(-1)
        this.calendarMonth = 11
      } else {
        this.calendarMonth = month
      }
    },
    clickMonthBtn(fix) {
      const todayMonth = this.calendarMonth == this.todayMonth
      if(fix < 0 && todayMonth) return
      const nextMonth = this.calendarMonth == this.getNextMonth(this.todayMonth)
      if(fix > 0 && nextMonth) return
            
      this.changeMonth(fix)
    },
    alreadyChooseDate() {
      const alreadyDate = this.orderMessage.dateData
      if (alreadyDate === '') return
      this.chooseDayYear = alreadyDate.year
      this.chooseDayMonth = alreadyDate.month
      this.chooseDayDate = alreadyDate.date
      this.chooseDayDay = alreadyDate.day
      this.calendarMonth = this.chooseDayMonth
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.calendar {
    color: $main-white-text;
    .title {
        font-size:20px;
        letter-spacing: 3px;
        margin-bottom: 25px;
        font-family: 'Noto Serif TC', serif;
    }
    .weekDay,.week{
        display: flex;
        border-bottom: 1px solid #aaa;
        >div {
            flex: 1 1 0%;
            line-height: 30px;
        }
        p {
            text-align: center;
        }      
    }
    .weekDay {
        border-top: 1px solid #aaa;
        .day {
            font-family: 'Noto Serif TC', serif;
            margin: 13px 0 10px 0;
            line-height: 20px;
            .dayEng {
                font-size: 12px;
            }
        }
    }
    .week {
        .date {
            cursor: pointer;
            font-family: 'Noto Serif TC', serif;
            padding: 15px 0;
        }
    }
    .other{
        cursor: auto !important;
        opacity: 0;
    }
    .notChooseDay {
        cursor: auto !important;
        color: #555;
    }
    .canChooseDay:hover, .chooseDay {
        color: #fff;
        background-color: #d0d0d04d;
    }
    .today {
        display: flex;
        flex-direction: column;
        p {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                bottom: -4px;
                left: calc(50% - 8px);
                width: 16px;
                height: 4px;
                background-color: $main-brow-text;
            }
        }
    }
}
</style>