<template>
    <Navbar />
    <router-view />
    <Footer />
    <LoginView />
    <Loading />
    <ChangePageAnim />
</template>

<script>
import Navbar from '@/components/all/Navbar.vue'
import Footer from '@/components/all/Footer.vue'
import LoginView from '@/views/LoginView.vue'
import Loading from '@/components/all/Loading.vue'
import ChangePageAnim from '@/components/all/ChangePageAnim.vue'

import {
  useCookies 
} from 'vue3-cookies'
const { cookies } = useCookies()

export default {
  name: 'All',
  components: {
    Navbar,
    Footer,
    LoginView,
    Loading,
    ChangePageAnim,
  },
  data() {
    return {
      acc: '',
      pwd: '',
      isAdmin: '',
    }
  },
  mounted() {
    this.acc = cookies.get('acc')
    this.pwd = cookies.get('pwd')
    this.isAdmin = cookies.get('isAdmin')

    if (this.acc !== null && this.pwd !== null) {
      this.memberLogin()
    }
  },
  methods: {
    memberLogin() {
      const isMemberLoginApi = (this.isAdmin === 'false') ? process.env.VUE_APP_M_LOGIN : process.env.VUE_APP_A_LOGIN
      this.axios.post(isMemberLoginApi, {
        'acc': this.acc,
        'pwd': this.pwd,
      }).then((response) => {
        const backData = response.data
        if (backData.status === 'success') {
          if (this.isAdmin === 'false') {
            this.storeMemberData(backData)
          } else {
            this.$store.dispatch('updateIsAdiminsLogin', true)
          }
          this.$store.dispatch('updateIsLoginSuccess', true)
          this.$store.dispatch('updateIsShowLogin', false)
        }
      }).catch(function(error) {
        console.log('error',error)
      })
    },
    storeMemberData(backData) {
      const memberData = backData.result[0]
      this.$store.dispatch('updateMemberName', memberData.name)
      this.$store.dispatch('updateMemberCellphone', memberData.cellphone)
      this.$store.dispatch('updateMemberEmail', memberData.email)
      this.$store.dispatch('updateMemberPassword', memberData.pwd)
      this.$store.dispatch('updateMemberId', memberData.MID)
    },
  },
}
</script>

<style lang="scss">
@import "../src/assets/scss/_all.scss";

* {
  text-align: left;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// #nav {
//   // padding: 30px;
//   position: sticky;
//   top: 0;
//   z-index: 99;
//   height: 50px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
