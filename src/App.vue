<template>
    <div>
        <Button @click="handleClick">Test</Button>
        <div class="view">
            <router-view />
        </div>
    </div>
</template>

<script>
import {
  Snackbar 
} from '@varlet/ui'
import '@varlet/ui/es/snackbar/style/index'
import gsap from 'gsap'

export default {
  name: 'App',
  mounted() {
    const api = 'https://randomuser.me/api'
    this.axios.get(api).then((response) => {
      console.log(response.data)
    })
  },
  methods: {
    handleClick() {
      Snackbar('你好!')
      window.$('.view').addClass('test')

      gsap.timeline().to('.view', {
        duration: 3,
        alpha: 0,
        delay: 1,
      }).to('.view', {
        duration: 3,
        alpha: 1,
        onComplete: () => {
          console.log('over')
        },
      })
    },
  },
}
</script>

<style lang="sass">
#app
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  width: 100%
  +desktop
    // background: #aaa
    +set-flex(center, center)
  .view
    width: calc(100% - 260px)
    min-height: 100vh
    background-color: #FCFCFC
    margin-left: 260px

// nav
//   padding: 30px
//   a
//     font-weight: bold
//     color: #2c3e50
//     &.router-link-exact-active
//       color: #42b983
</style>
