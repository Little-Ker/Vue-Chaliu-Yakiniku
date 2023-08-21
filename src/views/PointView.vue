<template>
    <div class="pointView main-bg-img">
        <div class="banner bg-fit" :style="{backgroundImage:'url('+img+')'}">
            <div class="blackHide"></div>
        </div>  
        <div class="container-1100">
            <div class="title dataPadding d-flex justify-content-center flex-direction-col">
                <h1 class="main-brow-text">門市據點</h1>
                <p class="main-brow-text">Location</p>
            </div>
        </div>
        <div v-for="(shop, index) in shopPointData" :key="index" class="shopList">
            <div class="img bg-fit" :style="{backgroundImage:'url('+shop.img+')', backgroundPositionY: `${imgPosAry[index]}%`}"></div>  
            <div class="container-1100 shopDataList main-white-text d-flex">
                <div class="w-50 align-self-center dataPadding">
                    <div class="shopData">
                        <p class="shopName main-brow-text">{{shop.shopName}}</p>
                    </div>
                    <div class="d-flex shopData">
                        <p class="shopTitle">地址</p>
                        <a :href="shop.mapUrl" target="_blank" class="main-white-text btn-hoverLine">{{shop.address}}</a> 
                    </div>
                    <div class="d-flex shopData">
                        <p class="shopTitle main-light-blue-text">電話</p>
                        <a :href="`tel:shop.phone`" class="main-white-text btn-hoverLine">{{shop.phone}}</a> 
                    </div>
                    <div class="d-flex shopData">
                        <p class="shopTitle">營業時間</p>
                        <p class="">AM 11:00 - PM 23:00</p>
                    </div>
                </div>
                <div class="w-50 dataPadding">
                    <iframe :src="shop.mapIframe" width="100%" height="280" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import shopPointData from '@/assets/datas/shopPointData.json'

export default {
  name: 'PointView',
  data() {
    return {
      img: require('@/assets/images/banner/03.jpg'),
      shopPointData: shopPointData.shop,
      imgPosAry: [ 0, 85, 80, 15 ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.pointView {
    position: relative;
    padding-bottom: 60px;
    .banner {
        width: 100%;
        height: 200px;
        margin-bottom: 80px;
        mask: linear-gradient(#000, 90%, transparent);
    }
    .shopName {
        font-size: 26px;
        margin-bottom: 45px;
        letter-spacing: 1px;
    }
    .shopList {
        margin-top: 60px;
        .img {
            height: 360px;
        }
    }
    .shopDataList {
        margin-top: 60px;
        .shopData {
            font-size: 18px;
            margin-bottom: 25px;
            &:last-child {
                margin-bottom: 0px;
            }
            .shopTitle {
                flex: 0 0 130px;
                color: rgba(255, 255, 255, 0.45);
            }
            .address {
                min-width: 280px;
            }
        }
        .dataPadding {
            padding: 0 20px;
        }
    }

    @media(max-width:935px){
        .shopDataList {
            justify-content: center;
            .dataPadding {
                padding: 0 40px;
                &:nth-child(2) {
                    padding-left: 0;
                }
                .shopData .shopTitle {
                    flex: 0 0 110px;
                }
            }
        }
        .w-50 {
            width: 100% !important;
        }
    }
    @media(max-width:900px){
        .shopList .img {
            height: 280px;
        }
    }
    @media(max-width:875px){
        .shopDataList {
            .dataPadding {
                padding: 0 10px;
                &:nth-child(2) {
                    padding-right: 10px;
                }
                .shopData .shopTitle {
                    flex: 0 0 100px;
                }
            }
        }
    }
    @media(max-width:770px){
        .shopDataList {
            .dataPadding {
                padding: 0 40px;
                &:nth-child(2) {
                    display: none !important;
                }
                .shopData .shopTitle {
                    flex: 0 0 130px;
                }
                .shopData .shopName {
                    margin-bottom: 25px;
                }
            }
        }
    }
    @media(max-width:710px){
        .title {
            h1 {
                font-size: 32px;
                text-align: center;
            }
            p {
                text-align: center;
            }
        }
        .shopList .img {
            height: 240px;
        }
        .shopName {
            font-size: 24px;
        }
    }
    @media(max-width:770px){
        .shopList {
            margin-top: 50px;
        }
        .shopDataList {
            margin-top: 50px;
            .dataPadding {
                padding: 0 30px;
                .shopData .shopTitle {
                    flex: 0 0 110px;
                }
            }
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
        .shopName {
            font-size: 22px;
        }
        .shopDataList .dataPadding {
            padding: 0 10px;
        }
    }
    @media(max-width:466px){
        .shopDataList {
            .dataPadding {
                padding: 0;
                .shopData {
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                    &:last-child {
                        margin-bottom: 0;  
                    }
                    .shopTitle {
                        flex: 0 0 100%;
                        margin-bottom: 7px;
                    }
                }
                p {
                    display: block;
                }
            }
            &.container-1100 {
                padding: 0 20px;
            }
        }
    }
}

</style>
