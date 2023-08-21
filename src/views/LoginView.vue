<template>
    <div class="LoginView">
        <Login />
        <NoticeModel />
        <Register />
    </div>
</template>

<script>
import Login from '@/components/login/Login.vue'
import NoticeModel from '@/components/login/NoticeModel.vue'
import Register from '@/components/login/Register.vue'

export default {
  name: 'LoginView',
  components: {
    Login,
    NoticeModel,
    Register,
  },
}
</script>

<style lang="scss" scoped>

</style>
