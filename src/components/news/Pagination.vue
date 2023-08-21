<template>
    <div class="pagination">
        <div :class="{notClick:nowNum === 1}" class="d-flex prev-btn" @click="clickAddNum(-1)">
            <p class="icon icon-left-open"></p>
            <p class="txt">PREV</p>
        </div>
        <div class="d-flex nums">
            <p v-for="(num, index) in getListNum" :key="index" :class="{active:nowNum === num}" @click="clickNumBtn(num)">{{num}}</p>
        </div>
        <div :class="{notClick:nowNum === getListNum}" class="d-flex next-btn" @click="clickAddNum(1)">
            <p class="txt">NEXT</p>
            <p class="icon-right-open icon"></p>
        </div>
    </div>
</template>

<script>
import newsListData from '@/assets/datas/newsListData.json'

export default {
  name: 'Pagination',
  props: ['chooseType'],
  data() {
    return {
      newsListData: newsListData.news,
      onePageCount: 5,
      nowNum: 1,
      isEnterFirst: true,
    }
  },
  computed: {
    newsListAry() {
      if (this.chooseType === '全部公告') return this.newsListData
      let newsAry = []
      this.newsListData.forEach((news) => {
        const newType = news.type
        if (newType === this.chooseType) newsAry.push(news)
      })
      return newsAry
    },
    getListNum() {
      const totalDataLength = this.newsListAry.length
      const addPage = ((totalDataLength % this.onePageCount) !== 0) ? 1 : 0
      const totalPage = Math.floor((totalDataLength / this.onePageCount) + addPage)
      return totalPage
    },
  },
  watch: {
    chooseType() {
      this.clickNumBtn(1)
    },
  },
  methods: {
    clickNumBtn(num) {
      this.nowNum = num
      this.sendPaginationNum()
    },
    clickAddNum(num) {
      if (num < 0 && this.nowNum === 1) return
      if (num > 0 && this.nowNum === this.getListNum) return
      this.nowNum += num
      this.sendPaginationNum()
    },
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
    sendPaginationNum() {
      this.goTop()
      if (!this.isEnterFirst) this.$store.dispatch('updateIsShowLoading', 2) 
      this.isEnterFirst = false
      this.$emit('nowPageNum', this.nowNum)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.pagination {
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 18px;
    margin-top: 70px;
    .icon {
        font-size: 14px;
        line-height: 20px;
    }
    .nums {
        p {
            cursor: pointer;
            padding: 0 5px;
            margin: 0 20px;
            color: #555;
            border-bottom: 1px solid rgba(204, 204, 204, 0);
            transition: .3s all;
            &:hover {
                color: #fff;
            }
        }
        .active {
            color: #fff;
            border-color: #ccc;
        }
    }
    .prev-btn, .next-btn {
        cursor: pointer;
        padding: 5px 0;
        .txt {
            font-family: "Noto Serif JP";
            margin: 0 15px;
        }
        .icon {
            transition: .3s all;
        }
    }
    .prev-btn:not(.notClick):hover {
        .icon {
            transform: translateX(-10px);
        }
    }
    .next-btn:not(.notClick):hover {
        .icon {
            transform: translateX(10px);
        }
    }
    .notClick {
        color: #555;
    }

    @media(max-width:660px){
        .nums p {
            margin: 0 10px;
        }
        .prev-btn .txt, .next-btn .txt {
            margin: 0 5px;
        }
    }
    @media(max-width:400px){
        .prev-btn .txt, .next-btn .txt {
            display: none;
        }
        .prev-btn, .next-btn {
            margin: 0 15px;
        }
    }
}
</style>

