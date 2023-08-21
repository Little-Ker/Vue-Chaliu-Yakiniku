<template>
    <div class="newView main-bg-img main-white-text">
        <div class="container-920">
            <div class="top">
                <p class="main-white-999 fw-700 text-right">{{newData.type}}</p>
                <p class="main-brow-text title fw-700">{{newData.title}}</p>
                <div class="top-share-block d-flex justify-content-between">
                    <p class="fw-700 main-white-999">{{newData.date}}</p>
                    <div class="share-list d-flex align-items-center">
                        <p class="share fw-700 main-white-999">SHARE</p>
                        <a :href="`http://line.naver.jp/R/msg/text/?${shareUrl}`" class="icon icon-line"></a>
                        <a :href="`https://www.facebook.com/sharer.php?u=${shareUrl}`" target="_blank" class="icon icon-facebook"></a>
                    </div>
                </div>
            </div>
            <div class="article">
                <p v-for="(txt, index) in newData.txt" :key="index">{{txt}}</p>
                <img :src="newData.img" alt="茶六">
            </div>
            <div class="bottom d-flex justify-content-between align-items-center">
                <router-link :to="`/new/${prevId}`" class="prev-btn d-flex align-items-center fw-700">
                    <p class="icon-left-open  main-brow-text"></p>
                    <p class="txt main-brow-text">PREV</p>
                    <p class="content text-left">{{preNewTitle}}</p>
                </router-link>
                <router-link to="/news" class="btn-border align-self-end">
                    <span class="btn-border-text fw-700 transition-0-3">返回列表</span>
                </router-link>
                <router-link :to="`/new/${nextId}`" class="next-btn d-flex align-items-center fw-700">
                    <p class="content text-right">{{nextNewTitle}}</p>
                    <p class="txt main-brow-text">NEXT</p>
                    <p class="icon-right-open main-brow-text"></p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import newsListData from '@/assets/datas/newsListData.json'

export default {
  name: 'NewsView',
  data() {
    return {
      newsListData: newsListData.news,
      id: 0,
      prevId: 0,
      nextId: 0,
    }
  },
  computed: {
    shareUrl() {
      const url = `https://lightten.tk:8082/CHALIU_WEB/#/new/${this.id}`
      return url
    },
    newData() {
      const news = this.newsListData[this.id]
      return news
    },
    newsLength() {
      return this.newsListData.length
    },
    nextNewId() {
      return function(num) {
        let newId = this.id + num
        if (newId < 0) newId = this.newsLength - 1
        if (newId >= this.newsLength) newId = 0
        return newId
      }
    },
    preNewTitle() {
      return this.newsListData[this.prevId].title
    },
    nextNewTitle() {
      return this.newsListData[this.nextId].title
    },
  },
  watch: {
    $route(now) {
      // console.log(now);
      this.resetId()
    },
  },
  mounted() {
    this.resetId()
    this.goTop()
  },
  methods: {
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
    resetId() {
      this.id = parseInt(this.$route.params.id)
      this.prevId = this.nextNewId(-1)
      this.nextId = this.nextNewId(1)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.newView {
    padding-bottom: 60px;
    padding-top: 140px;
    .container-920 {
        padding: 0 30px;
    }
    p {
        font-family: "Courier New", Courier, monospace;
    }
    .top {
        position: relative;
        padding-bottom: 20px;
        border-bottom: 1px solid $main-white-999;
        .title {
            font-size: 28px;
            margin: 7px 0;
            line-height: 36px;
        }
        .share {
            position: relative;
            width: 60px;
            letter-spacing: 2px;
            margin-right: 70px;
            padding: 5px;
            &::before {
                content: '';
                position: absolute;
                right: -105%;
                top: 45%;
                width: 50px;
                height: 1px;
                background-color: #aaa;
            }
        }
        .icon {
            margin: 0 6px;
            font-size: 22px;
            color: $main-white-999;
            transition: .3s all;
            &:hover {
                color: $main-white-text;
            }
        }
    }
    .article {
        padding: 30px 0 40px 0;
        border-bottom: 1px solid $main-white-999;
        p {
            line-height: 30px;
            margin-bottom: 5px;
        }
        img {
            width: 100%;
            max-width: 460px;
            margin: 5px 0;
        }
    }
    .bottom {
        padding-top: 60px;
        .prev-btn, .next-btn {
            color: $main-white-text;
            .txt {
                margin: 0 10px;
            }
            .content {
                width: 180px;
                line-height: 1.8;
                margin: 0 10px;
            }
            .icon-left-open, .icon-right-open, .content {
                transition: .3s all;
            }
            &:hover .content {
                color: $main-brow-text;
            }
        }
        .prev-btn:hover .icon-left-open {
            transform: translateX(-10px);
        }
        .next-btn:hover .icon-right-open {
            transform: translateX(10px);
        }
        .btn-border {
            margin: 0;
            margin-bottom: 5px;
        }
    }

    @media(max-width:810px){
        .top {
            .text-right{
                text-align: left !important;  
            }
            .title {
                font-size: 28px;
                margin-left: -2px;
            }
            .top-share-block {
                flex-direction: column;
                .share-list {
                    align-self: flex-end !important;
                    margin-top: 30px;
                    .share {
                        right: -37px;
                        &::before {
                            width: 20px;
                            right: -50%;
                        }
                    }
                }
            }
        }
        .content {
            display: none;
        }
    }
    @media(max-width:530px){
        .newView {
            padding-top: 120px;
        }
        .title {
            font-size: 24px !important;
        }
        .bottom {
            .btn-border {
                width: 120px;
            }
            .txt {
                margin: 0 !important;
            }  
        }
    }
    @media(max-width:370px){
        .bottom .btn-border {
            width: 100px;
        }
    }
}
</style>
