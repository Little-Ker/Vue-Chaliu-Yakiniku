<template>
    <div class="home main-bg-img">
        <Banner />
        <AboutText />
        <News />
        <Delicacy />
        <Reserve />
    </div>
</template>

<script>
import Banner from '@/components/index/Banner.vue'
import AboutText from '@/components/index/AboutText.vue'
import News from '@/components/index/News.vue'
import Delicacy from '@/components/index/Delicacy.vue'
import Reserve from '@/components/index/Reserve.vue'

export default {
  name: 'HomeView',
  components: {
    Banner,
    AboutText,
    News,
    Delicacy,
    Reserve,
  },
}
</script>

<style lang="scss" scoped>

.home {}

// .main-bg-img {
//   height: 2000px;
// }

</style>
