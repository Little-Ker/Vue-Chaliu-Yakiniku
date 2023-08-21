<template>
    <div class="newsView main-bg-img">
        <div class="banner bg-fit" :style="{backgroundImage:'url('+img+')'}">
            <div class="blackHide"></div>
        </div>  
        <div class="container-1100">
            <div class="title dataPadding d-flex justify-content-center flex-direction-col">
                <h1 class="text-center main-brow-text">活動新訊</h1>
                <p class="text-center main-brow-text">News</p>
            </div>
            <TypeMenu @chooseType="getType"></TypeMenu>
            <NewsList :now-page-num="nowPageNum" :choose-type="chooseType"></NewsList>
            <Pagination  :choose-type="chooseType" @nowPageNum="getPageNum"></Pagination>     
        </div>
    </div>
</template>

<script>
import TypeMenu from '@/components/news/TypeMenu.vue'
import NewsList from '@/components/news/NewsList.vue'
import Pagination from '@/components/news/Pagination.vue'

export default {
  name: 'NewsView',
  components: {
    TypeMenu,
    NewsList,
    Pagination,
  },
  data() {
    return {
      chooseType: '',
      nowPageNum: '',
      img: require('@/assets/images/banner/01.jpg'),
    }
  },
  methods: {
    getType(setTypeVal) {
      this.chooseType = setTypeVal
    },
    getPageNum(setPageNumVal) {
      this.nowPageNum = setPageNumVal
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.newsView {
    padding-bottom: 60px;
    .banner {
        width: 100%;
        height: 200px;
        margin-bottom: 80px;
        mask: linear-gradient(#000, 90%, transparent);
    }
    .title {
        margin-bottom: 30px;
    }

    @media(max-width:710px){
        .title h1 {
            font-size: 32px;
        }
    }
    @media(max-width:530px){
        .title h1 {
            font-size: 28px;
        }
        .banner {
            height: 150px;
            margin-bottom: 60px;
        }
        .container-1100 {
            padding: 0 20px !important;
        }
    }
}
</style>

