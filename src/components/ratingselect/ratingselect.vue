<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2, $event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{'on': onlyContent}" @click="toggleContent($event)">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positive () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negative () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$dispatch('ratingtype.select', type);
      },
      toggleContent (event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$dispatch('content.toggle', this.onlyContent);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 10px
      border-1px(rgba(7, 17, 27, .1))
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        color: rgb(77, 85, 93)
        font-size: 12px
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: rgba(0, 160, 220, .2)
          &.active
           background: rgba(0, 160, 220, 1)
        &.negative
          background: rgba(78, 85, 93, .2)
          &.active
            background: rgba(78, 85, 93, 1)
    .switch
      padding: 12px 18px
      line-height: 24px
      font-size: 0
      border-bottom: 1px solid rgba(7, 17, 27, .1)
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        margin-right: 4px
        vertical-align: top
        font-size: 24px
      .text
        font-size: 12px

</style>
