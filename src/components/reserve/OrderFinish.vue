<template>
    <div class="orderFinish">
        <div class="container-620 w-100">
            <div class="icon-ok-circled main-white-text text-align-center"></div>
            <p class="main-white-text text-align-center">您的預約已完成！</p>
        </div>
        <div class="d-flex justify-content-center">
            <router-link to="/member/reserve" class="btn-border" @click="goTop()">
                <span class="btn-border-text fw-700 transition-0-3">前往預約紀錄</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'OrderFinish',
  methods: {
    goTop() {
      $('html,body').scrollTop(0, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.orderFinish {
    .icon-ok-circled {
        font-size: 150px;
        opacity: .5;
        margin: 40px 0 30px 0;
    }
    p {
        font-size: 22px;
        letter-spacing: 3px;
    }
    .btn-border {
        width: 220px;
        height: 55px;
        margin: 0;
        margin-top: 50px;
        letter-spacing: 1px;
    }

    @media(max-width:530px){
        p {
            font-size: 20px;
        }
    }
}
</style>
