<template>
    <div class="nav">
        <div class="navBg d-flex justify-content-bewteen">
            <router-link to="/" class="logo" @click="startScrollBar();isClickToggle = false;">
                <img :src="logoUrl" class="img-fit" alt="茶六">
            </router-link>
            <div :class="{'showMenu':isClickToggle}" class="d-flex menu">
                <router-link v-for="(item, index) in linkList" :key="index" :to="item.url" class="link" @click="startScrollBar();isClickToggle = false;">{{item.txt}}</router-link>
                <a v-if="!isLoginSuccess" class="loginBtn transition-0-3" @click="isClickToggle = false;clickLoginFn();">會員登入</a>
                <a v-if="isLoginSuccess" class="loginBtn userBtn flex-direction-col transition-0-3" @click="isClickToggle = false;clickAdminFn();goTop();">
                    <p class="icon-cog"></p>
                    <p v-if="!isAdiminsLogin">會員系統</p>
                    <p v-else>管理員系統</p>
                </a>
            </div>
            <div :class="{'active':isClickToggle}" class="menu-toggle " @click="isClickToggle = !isClickToggle;clickMenuToggleFn()">
                <div class="bar bar01 transition-0-3"></div>
                <div class="bar bar02 transition-0-3"></div>
                <div class="bar bar03 transition-0-3"></div>
            </div>
        </div>
        <div class="navBottom">
            <a v-if="!isLoginSuccess" class="bottom-btn link loginBtn2 transition-0-3" @click="isClickToggle = false;clickLoginFn()">
                <p class="icon-user">會員登入</p>
            </a>
            <a v-if="isLoginSuccess" class="bottom-btn link loginBtn2 transition-0-3" @click="isClickToggle = false;clickAdminFn();goTop();">
                <p v-if="!isAdiminsLogin" class="icon-cog">會員系統</p>
                <p v-else class="icon-cog">管理員系統</p>
            </a>
            <router-link to="/reserve" class="link bottom-btn transition-0-3" @click="isClickToggle = false;">
                <p class="icon-calendar">線上訂位</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isClickToggle: false,
      logoUrl: require('@/assets/images/all/logo02.png'),
      linkList: [
        {
          txt: '活動新訊',
          url: '/news',
        },
        {
          txt: '美食饗宴',
          url: '/menu',
        },
        {
          txt: '門市據點',
          url: '/point',
        },
        {
          txt: '線上訂位',
          url: '/reserve',
        },
      ],
    }
  },
  computed: {
    isLoginSuccess() {
      return this.$store.state.isLoginSuccess
    },
    isAdiminsLogin() {
      return this.$store.state.isAdiminsLogin
    },
  },
  mounted() {
    this.showBottomBtn()
  },
  methods: {
    clickLoginFn() {
      this.clickMenuToggleFn()
      this.$store.dispatch('updateIsShowLogin', true)
      this.stopScrollBar()
    },
    clickAdminFn() {
      this.clickMenuToggleFn()
      if (!this.isAdiminsLogin) {
        this.$router.push('/member/reserve')
        return
      }
      this.$router.push('/admin/reserve')
    },
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
    // 禁用滾動條
    stopScrollBar() {
      var tops = $(document).scrollTop()
      $(document).bind('scroll',function (){$(document).scrollTop(tops) })
    },
    startScrollBar() {
      $(document).unbind('scroll')
    },
    showBottomBtn() {
      $(window).scroll(() => {
        ($(window).scrollTop() > 10) ? $('.navBottom').addClass('showBottomBtn') : $('.navBottom').removeClass('showBottomBtn')
      })
    },
    clickMenuToggleFn() {
      if (this.isClickToggle) {
        $('.navBottom').addClass('showMenuBottomBtn')
        $('.navBottom').removeClass('no-display')
        this.stopScrollBar()
      }
      else {
        this.startScrollBar()
        $('.navBottom').addClass('no-display')
        $('.navBottom').removeClass('showMenuBottomBtn');
        ($(window).scrollTop() > 10) ? $('.navBottom').addClass('showBottomBtn') : $('.navBottom').removeClass('showBottomBtn')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.nav {
    .navBg {
        display: block;
        position: fixed;
        top: 0;
        z-index: 99;
        width: 100%;
        // background: -webkit-linear-gradient(90deg, rgba(0, 0, 0, 0)0%, rgba(0, 0, 0, 0.4)30%, rgba(0, 0, 0, 1)100%);
        background: linear-gradient(270deg, rgba(0, 0, 0, 0.8)22%, rgba(255, 255, 255, 0)82%);
        background: -webkit-linear-gradient(270deg, rgba(0, 0, 0, 0.8)22%, rgba(255, 255, 255, 0)82%);
        height: 70px;
        .menu {
            transition: .6s all;
            a {
                color: $main-white-text;
                letter-spacing: 2px;
                font-size: 14px;
                margin-left: 30px;
            }
            .link {
                padding: 9px 15px;
                margin-top: 20px;
                position: relative;
                &::after {
                    content: '';
                    width: 0;
                    height: 0.5px;
                    background-color: #fff;
                    position: absolute;
                    bottom: 15px;
                    left: 0px;
                    right: 0px;
                    margin: auto;
                    transition: .3s;
                }
                &:hover::after {
                    width: 40%;
                }
            }
        }
        .logo {
            width: 100px;
            height: 40px;
            margin-top: 15px;
            margin-left: 30px;
            z-index: 100;
        }
        .menu-toggle {
            cursor: pointer;
            height: 100%;
            width: 50px;
            position: relative;
            right: 20px;
            padding: 20px 0;
            display: none;
            flex-direction: column;
            align-items: flex-end;
            .bar {
                height: 2px;
                width: 50%;
                background-color: #fff;
                position: absolute;
                top: 50%;
            }
            .bar01 {
                top: 37%;
            }
            .bar02 {
                    width: 40%;
            }
            .bar03 {
                top: 63%;
            }
            &:hover {
                .bar {
                    background-color: $main-brow-text;
                }
            }
            &.active {
                .bar {
                    background-color: $main-brow-text;
                }
                .bar01 {
                    top: 50%;
                    transform: rotate(45deg);
                }
                .bar02 {
                    width: 0;
                }
                .bar03 {
                    top: 50%;
                    transform: rotate(-45deg);
                }
            }
        }
    }
    .loginBtn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        width: 100px;
        background-color: $main-brow-text;
        &:hover {
            background-color: #c7994f;
            color: #fff;
        }
    }
    .userBtn {
        .icon-cog {
            font-size: 18px;
            margin-bottom: 2px;
        }
    }
    .navBottom {
        position: fixed;
        display: none;
        bottom: -60px;
        z-index: 99;
        width: 100%;
        height: 60px;
        transition: .3s all;
        .bottom-btn {
            width: 50%;
            &.link {
                color: $main-white-text;
                height: 100%;
                display: block;
                background-color: $main-blue-text;
                p {
                    font-size: 18px;
                    text-align: center;
                    line-height: 60px;
                    &::before {
                        margin-right: 10px;
                    }
                }
                &:hover {
                    background-color: $main-light-blue-text;
                }
            }
            &.loginBtn2 {
                background-color: $main-brow-text;
                &:hover {
                    background-color: $main-light-brow-text;
                }
            }
        }
        &.showBottomBtn {
            bottom: 0;
        }
        &.showMenuBottomBtn {
            bottom: 0 !important;
        }
    }

    @media(max-width:880px) {
        .menu {
            .link {
                margin-left: 10px !important;
            }
        }
    }
    @media(max-width:768px) {
        .menu {
            background-color: rgba(0, 0, 0, 0.9);
            position: fixed;
            width: 100%;
            height: 100vh;
            right: -100%;
            flex-direction: column;
            padding: 120px 30px;
            .link {
                margin: 0 !important;
                display: block;
                font-size: 18px !important;
                padding: 20px 5px !important;
                border-bottom: 1px solid #333;
                transition: .3s all;
                font-weight: 700;
                &:first-child {
                    border-top: 1px solid #333;
                }
                &:hover {
                    color: $main-brow-text;
                    &::after {
                        display: none;
                    }
                }
            }
            .loginBtn {
                display: none;
            }
        }
        .showMenu {
            right: 0;
        }
        .menu-toggle {
            display: flex !important;
        }
        .navBottom {
            display: flex;
        }
    }
    @media(max-width:576px) {
        .logo {
            margin-left: 20px !important;
        }
        .menu {
            padding: 100px 20px;
            .link {
                font-size: 16px !important;
            }
        }
        .navBottom {
            height: 55px;
            .bottom-btn.link p {
                font-size: 16px;
                line-height: 55px ;
            }  
        }
    }
}
</style>