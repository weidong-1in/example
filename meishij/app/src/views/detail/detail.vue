<template>
  <div class="menu-detail">
    <detail-header :info="menuInfo"></detail-header>
    <detail-content :info="menuInfo"></detail-content>
    <Comment :info="menuInfo"></Comment>
  </div>
</template>
<script>
import Comment from "./comment";
import DetailHeader from "./detail-header";
import DetailContent from "./detail-content";
import { menuInfo } from "@/service/api";
export default {
  name: "detail",
  components: {
    Comment,
    DetailHeader,
    DetailContent
  },
  data() {
    return {
      menuInfo: {
        userInfo: {},
        raw_material:{
          main_material:[],
          accessories_material:[]
        },
        steps:[]
      }
    };
  },
  watch: {
    $route: {
      handler() {
        let { menuId } = this.$route.query;
        // console.log(menuId);
        if (menuId) {
          menuInfo({ menuId }).then(res => {
            // console.log(res);
            this.menuInfo = res.data.info;
          });
        } else {
          this.$message({
            showClose: true,
            message: "请重新进入",
            type: "warning"
          });
        }
      },
      immediate: true
    }
  }
};
</script>