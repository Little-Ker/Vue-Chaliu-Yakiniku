<template>
    <div class="adminView" :style="{backgroundImage:'url('+bg+')'}">
        <div class="container-920 d-flex">
            <div class="choose d-flex flex-direction-col">
                <div class="top">
                    <p class="fw-700">管理員<br>後台</p>
                </div>
                <div class="bottom">
                    <!-- <div class="link-list"> -->
                    <router-link to="/admin/reserve" class="link icon-article-alt" @click="goTop">訂位紀錄</router-link>
                    <router-link to="/admin/memberList" class="link icon-user" @click="goTop">會員名單</router-link>
                    <a class="link icon-ccw" @click="loginOut">登出</a>
                    <!-- </div> -->
                </div>
            </div>
            <div class="message">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AdminView',
  data() {
    return {
      bg: require('@/assets/images/all/bg02.png'),
    }
  },
  computed: {
    memberName() {
      return this.$store.state.memberName
    },
  },
  mounted() {
    $('.nav').addClass('blackNav')
    $('.footer').addClass('removePadding')
    $('.navBottom').addClass('no-display')
  },
  beforeUnmount() {
    $('.nav').removeClass('blackNav')
    $('.footer').removeClass('removePadding')
    $('.navBottom').removeClass('no-display')
  },
  methods: {
    loginOut() {
      this.$store.dispatch('updateIsShowCheckNotice', true)
    },
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";
.adminView {
    padding-top: 140px;
    padding-bottom: 100px;
    .container-1440 {
        padding: 0 70px;
    }
    .choose, .message {
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .choose {
        height: 310px;
        width: 20%;
        margin-right: 50px;
        padding: 10px 20px;
        align-items: center;
        .top {
            padding: 30px 20px;
            p {
                line-height: 25px;
            }
        }
        .bottom {
            border-top: 1px solid #DCDCDC;
            padding: 10px;
            .link {
                cursor: pointer;
                color: $main-blue-text;
                transition: .3s all;
                margin: 20px 0;
                padding: 5px;
                font-weight: 700;
                &::before {
                    margin-right: 10px;
                }
                &:hover, &.router-link-active {
                    color: $main-brow-text; 
                }
            }
        }
    }
    .message {
        padding: 60px 50px;
        width: 80%;
    }

    @media(max-width:990px){
        .choose {
            margin-right: 30px;
        }
    }
    @media(max-width:880px){
        .container-920 {
            flex-wrap: wrap;
            max-width: 680px;
        }
        .choose {
            font-size: 18px;
            width: 100%;
            height: auto;
            margin: 0 0 30px 0;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 30px 0;
            .top {
                padding: 0 80px;
                font-size: 20px;
                p {
                    line-height: 32px;
                    text-align: center;
                    padding: 0;
                }
            }
            .bottom {
                padding: 0 80px;
                border-top: 0;
                border-left: 1px solid #DCDCDC;
                .link {
                    margin: 15px 0;
                }
            }
        }
        .message {
            width: 100%;
        }
    }
    @media(max-width:576px){
        padding-top: 100px;
        padding-bottom: 60px;
        .choose {
            .top {
                padding: 0 50px;
            }
            .bottom {
                padding: 0 50px;
            }
        }
        .message {
            padding: 35px 25px;
        }
    }
    @media(max-width:420px){
        .choose {
            padding: 30px 40px;
            .top {
                font-size: 18px;
                padding: 0 35px 0 0;
                p {
                    line-height: 30px;
                }
            }
            .bottom {
                border: 0;
                border-left: 1px solid #DCDCDC;
                padding: 0 0 0 35px;
                .link:last-child {
                    margin-bottom: 0;
                }
                .link:first-child {
                    margin-top: 0;
                }
                .link {
                    font-size: 16px;
                    margin: 5px 0;
                }
            }
        }
    }
    @media(max-width:345px){
        .choose {
            padding: 25px 30px;
            .top {
                padding: 0 25px 0 0;
            }
            .bottom {
                padding: 0 0 0 25px;
            }
        }
    }
}
</style>
