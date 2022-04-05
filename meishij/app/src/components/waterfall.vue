<template>
  <div class="waterfall" ref="waterfall">
    <!--插槽-放置展示内容组件-->
    <slot></slot>
    <div class="waterfall-loading" ref="loading" v-show="isLoading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
//达到可视区=> waterfall元素下边距 < 可视区高度
import { throttle } from "throttle-debounce";
export default {
  name: "Waterfall",
  data() {
    return {
      isLoading: false
    };
  },
  mounted() {
    //节流  每隔一段时间执行
    this.scrollHandler = throttle(300, this.scroll.bind(this));
    window.addEventListener("scroll", this.scrollHandler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  methods: {
    scroll() {
      if (this.isLoading) return;
      if (
        this.$refs.waterfall.getBoundingClientRect().bottom <
        document.documentElement.clientHeight
      ) {
        this.isLoading = true;
        this.$emit("view");
      }
    }
  }
};
</script>

<style lang="stylus">
.waterfall-loading {
  width: 100%;
  height: 20px;
  text-align: center;
}
</style>