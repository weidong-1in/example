<template>
  <div class="home">
    <!-- 轮播图-卡片-->
    <el-carousel :interval="5000" type="card" height="200px">
      <el-carousel-item v-for="item in banners" :key="item._id">
        <router-link :to="{name:'detail',query:{menuId:item._id}}">
          <img :src="item.product_pic_url" width="100%" alt />
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <!-- 精选内容视图-->
    <div>
      <h2>内容精选</h2>
      <!-- 瀑布流视图-->
      <waterfall ref="waterfall" @view="loadingMenuHandle">
        <menu-card :margin-left="5" :info="menuList"></menu-card>
      </waterfall>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getBanner, getMenus } from "@/service/api.js";
import Waterfall from "@/components/waterfall";
import MenuCard from "@/components/menu-card";
export default {
  name: "home",
  data() {
    return {
      banners: [],
      menuList: [],
      page: 1
    };
  },
  components: {
    Waterfall,
    MenuCard
  },
  async mounted() {
    const res = await getBanner();
    this.banners = res.data.list;
    const menus = await getMenus({page:this.page});
    this.menuList = menus.data.list;
    this.pages = Math.ceil(menus.data.total / menus.data.page_size);//总页数
  },
  methods: {
    loadingMenuHandle() {
      this.page++;
      if (this.page > this.pages) {
        this.$refs.waterfall.isLoading = false;
        return;
      }
      this.$refs.waterfall.isLoading = true;
      getMenus({ page: this.page }).then(data => {
        this.menuList.push(...data.data.list);
        this.$refs.waterfall.isLoading = false;
      });
    }
  }
};
</script>

<style lang="stylus">
.home {
  h2 {
    text-align: center;
    padding: 20px 0;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>