<template>
    <div class="admin-memberList">
        <h1 class="title">會員名單</h1>
        <div class="d-flex justify-content-end">
            <div class="form">
                <input v-model="filterTxt" type="text" placeholder="關鍵字搜尋">
                <p class="icon-search"></p>
            </div>   
        </div>
        <div class="list">
            <div class="listTitle d-flex">
                <div class="widthM item"><b>帳號</b></div>
                <div class="widthM item"><b>姓名</b></div>
                <div class="widthL item"><b>電話</b></div>
                <div class="widthL item"><b>信箱</b></div>
            </div>
            <div v-for="(member, index) in filerMemberData" :key="index" class="listItem d-flex">
                <div class="widthM">
                    <p class="item-title">帳號</p>
                    <p class="item">{{member.acc}}</p>
                </div>
                <div class="widthM">
                    <p class="item-title">姓名</p>
                    <p class="item">{{member.name}}</p>
                </div>
                <div class="widthL">
                    <p class="item-title">電話</p>
                    <p class="item">{{member.cellphone}}</p>
                </div>
                <div class="widthL">
                    <p class="item-title">信箱</p>
                    <p class="item">{{member.email}}</p>
                </div>
            </div>
        </div>
        <div v-if="filerMemberData.length === 0" class="noMember">
            <p class="icon-cancel-circled text-align-center"></p>
            <p class="txt fw-700 text-align-center">無任何會員資料</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      memberList: [],
      filterTxt: '',
    }
  },
  computed: {
    filerMemberData() {
      let filerMemberList = this.memberList
      if (this.filterTxt === '') {
        return filerMemberList
      }
      return filerMemberList = this.memberList.filter(member => 
        (member.name.toLowerCase()).match(this.filterTxt.toLowerCase()) ||
                (member.cellphone.toLowerCase()).match(this.filterTxt.toLowerCase()) ||
                (member.email.toLowerCase()).match(this.filterTxt.toLowerCase())
      )
    },
  },
  created() {
    this.getMemberListData()
  },
  methods: {
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
    goTopScroll() {
      $('html,body').animate({ scrollTop: (0, 0) }, 'slow')
    },
    getMemberListData() {
      this.$store.dispatch('updateIsShowLoading', 0)
      const showMemberListApi = process.env.VUE_APP_A_SHOW_MEMBER_INFO
      this.axios.post(showMemberListApi).then((response) => {
        this.$store.dispatch('updateIsShowLoading', 2)
        const backData = response.data.result
        this.memberList = backData
      }).catch(function(error) {
        console.log('error',error)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.admin-memberList {
    .title {
        padding-left: 30px;
        font-size: 24px;
        font-weight: 700;
    }
    .form {
        margin-top: 50px;
        margin-bottom: 40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        input {
            outline: 0;
            border: 0;
            background-color: transparent;
            padding: 10px 15px;
            width: 180px;
            letter-spacing: 1px;
            font-weight: 700;
            color: #555;
        }
        input::-webkit-input-placeholder {
            color: #aaa;
        }
        .icon-search {
            display: inline-block;
            margin: 0 5px 5px 0;
            border-left: 1px solid #ccc;
            font-size: 22px;
            padding: 0 0 0 5px;
        }
    }
    .list {
        .listTitle, .listItem {
            padding: 20px 5px;
            letter-spacing: 1px;
            .item-title {
                margin: 0 15px 3px 0;
                display: none;
            }
            .item {
                text-align: center;
                padding: 0 5px;
                font-weight: 700;
            }
        }
        .listTitle {
            border: 1.5px solid #000;
            border-left: 0px;
            border-right: 0px;
        }
        .listItem {
            font-size: 14px;
            border-bottom: 1px solid rgba(218, 218, 218);
            color: #656565;
            &:hover {
                color: $main-brow-text;
            }
        }
        .widthM {
            width: 20%;
        }
        .widthL {
            width: 30%;
        }
    }
    .noMember {
        padding: 120px 0 80px 0;
        .icon-cancel-circled {
            font-size: 72px;
        }
        .txt {
            font-size: 20px;
            margin-top: 30px;
        }
    }

    @media(max-width:880px){
        .title {
            padding-left: 0;
        }
    }
    @media(max-width:576px){
        .title {
            font-size: 20px;
            padding-left: 10px;
        }
        .list {
            .listTitle {
                display: none !important;
            }
            .listItem  {
                padding: 15px 10px;
                flex-direction: column;
                .widthL, .widthM {
                    width: 100% !important;
                }
                .item-title, .item {
                    display: inline-block !important;
                }
            }
        }
        .form {
            margin-top:50px;
            margin-bottom:10px;
            input {
                width: 140px;
            }
        }
    }
}
</style>