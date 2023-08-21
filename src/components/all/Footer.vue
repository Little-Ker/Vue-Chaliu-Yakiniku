<template>
    <div class="footer">
        <div class="footer-block d-flex justify-content-bewteen container-1440">
            <div class="left align-self-end">
                <div class="navList d-flex">
                    <router-link v-for="(item, index) in linkList" :key="index" :to="item.url" class="d-block main-white-text link">{{item.txt}}</router-link>
                </div>
                <p class="d-block leftTxt main-white-text font-Roboto">2022 Vue Chaliu Yakiniku by Vivi</p>
            </div>
            <div class="right d-flex flex-direction-col">
                <div class="logo align-self-end">
                    <img :src="logoUrl" class="img-fit" alt="茶六">
                </div>
                <div class="d-flex justify-content-end">
                    <a href="https://www.facebook.com/chaliuyakiniku/" target="_blank" class="main-white-text link icon-facebook-rect transition-0-3"></a>
                    <a href="mailto:taichuwang101@gmail.com" class="main-white-text link icon-mail transition-0-3"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      logoUrl: require('@/assets/images/all/logo.png'),
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
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.footer {
    position: relative;
    z-index: 10;
    width: 100%;
    background-color: #07111B;
    .footer-block {
        padding: 0 40px;
        padding-top: 70px;
        padding-bottom: 30px;
        .navList {
            .link {
                position: relative;
                padding: 15px 0;
                padding-right: 30px;
                top: 0;
                text-decoration: none;
                transition: .3s all;
                &:hover {
                    top: -5px;
                    font-weight: 700;
                    color: aliceblue;
                }
            }
        }
        .leftTxt {
            margin-top: 20px;
            margin-bottom: 0;
            font-size: 12px;
            letter-spacing: 1px;
        }
        .right {
            .logo {
                height: 150px;
                width: 75px;
                margin-bottom: 20px;
                position: relative;
            }
            .link {
                cursor: pointer;
                width: 40px;
                height: 40px;
                background-color: $main-brow-text;
                border-radius: 50%;
                margin-left: 10px;
                margin-right: 5px;
                font-size: 18px;
                position: relative;
                &::before {
                    line-height: 40px;
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    transition: .3s all;
                }
                &:hover {
                    &::before {
                        color: $main-white-text;
                        text-decoration: none;
                    }
                    transform: scale(1.1);
                }
            }
        }
    }

    @media(max-width:768px) {
        padding-bottom: 50px;
    }
    @media(max-width:576px) {
        .footer-block {
            padding: 40px;
            padding-top: 50px;
        }
        .left {
           .navList {
                flex-direction: column;
                .link:hover {
                    top: 0px;
                    font-weight: 500;
                }
            } 
        }
        .right {
            justify-content: flex-end;
        }
    }
    @media(max-width:430px) {
        .footer-block {
            flex-direction: column-reverse;
            padding-bottom: 30px;
            .left {
                align-self: center !important;
                .navList {
                    display: none !important;
                } 
            }
            .right {
                align-self: center;
                .logo {
                    align-self: center !important;
                }
            }
        }
    }
}
</style>