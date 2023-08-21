<template>
    <div class="typeMenu">
        <div class="typeList d-flex justify-content-end">
            <a v-for='(type, index) in newsTypesAry' :key='index' class="typeBorder">
                <input :id="`type0${index}`" v-model="selectType" type="radio" name='newsType' :value="type">
                <label :for="`type0${index}`" class="typeStyle">{{type}}</label>  
            </a>
        </div>
    </div>
</template>

<script>
import newsListData from '@/assets/datas/newsListData.json'

export default {
  name: 'TypeMenu',
  data() {
    return {
      newsListData: newsListData.news,
      selectType: '全部公告',
    }
  },
  computed: {
    setActiveClass() {
      return function(type) {
        return  this.selectType === type
      }
    },
    newsTypesAry() {
      let typesAty = [ '全部公告']
      this.newsListData.forEach((news) => {
        const type = news.type
        if (typesAty.indexOf(type) === -1) typesAty.push(type)
      })
      return typesAty
    },
  },
  watch: {
    selectType() {
      this.sendTypeValue()
    },
  },
  mounted() {
    this.sendTypeValue()
  },
  methods: {
    sendTypeValue() {
      this.$emit('chooseType', this.selectType)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variable.scss";

.typeMenu {
    .typeList {
        margin: 0 0 40px 0;
        input:checked + label, input:hover + label {
            color: $main-white-text;
        }
        input {
            display: none;
        }
        .typeBorder {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                width: 0.5px;
                height: 50%;
                right: 0;
                top: 30%;
                background-color: $main-white-555;
            }
            &:last-child::before {
                width: 0;
            }
        }
        .typeStyle {
            cursor: pointer;
            text-align: center;
            line-height: 50px;
            height: 55px;
            color: $main-white-555;
            padding: 5px 40px;
            transition: .3s all;
            font-weight: 700;
        }
    }

    @media(max-width:768px){
        .typeStyle {
            padding: 5px 30px !important;
        }
    }
    @media(max-width:576px){
        .typeList {
            justify-content: center !important;
        }
        .typeStyle {
            padding: 5px 20px !important;
        }
    }
    @media(max-width:481px){
        .typeStyle {
            padding: 5px 20px !important;
        }
    }
    @media(max-width:456px){
        .typeList {
            margin: 0 0 50px 0;
            .typeBorder::before {
                height: 60%;
                top: 25%;
            }
            .typeStyle {
                width: 85px;
                line-height:24px;
                padding: 5px 30px;
            }
        }
    }
    @media(max-width:400px){
        .typeList {
            .typeStyle {
                width: 75px;
                padding: 5px 15px !important;
            }
        }
    }
}
</style>

