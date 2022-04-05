<template>
  <div class="create">
    <h2>欢迎发布新菜谱，先介绍一下你的大作！</h2>
    <section class="create-introduce">
      <h5>标题</h5>
      <el-input class="create-input" placeholder="请输入内容" v-model="backData.title"></el-input>
      <h5>属性</h5>
      <div>
        <el-select
          v-for="item in mockData.properties"
          :key="item.parent_type"
          :placeholder="item.parent_name"
          v-model="backData.property[item.title]"
        >
          <el-option
            v-for="option in item.list"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </div>
      <h5>菜谱分类</h5>
      <div>
        <el-select placeholder="请选择菜谱分类" v-model="backData.classify">
          <el-option-group
            v-for="group in mockData.classifies"
            :key="group.parent_type"
            :label="group.parent_name"
          >
            <el-option
              v-for="item in group.list"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-option-group>
        </el-select>
      </div>
      <h5>成品图 (328*440)</h5>
      <div class="upload-img-box clearfix">
        <div class="upload-img">
          <upload-img
            action="/api/upload?type=product"
            :imageUrl="backData.product_pic_url"
            @res-url="(data)=>{backData.product_pic_url=data.resImgUrl}"
          ></upload-img>
        </div>
        <el-input
          class="introduce-text"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="backData.product_story"
        ></el-input>
      </div>
    </section>

    <h2>记录所有原材料</h2>
    <section class="create-introduce">
      <h5>主料</h5>
      <!--[ { "name": "", "specs": "" }, { "name": "", "specs": "" }, { "name": "", "specs": "" } ]-->
      <Stuff v-model="backData.raw_material.main_material"></Stuff>
      <h5>辅料</h5>
      <Stuff v-model="backData.raw_material.accessories_material"></Stuff>
    </section>

    <h2>开始写步骤了！能否简单易学就看你怎么写了，加油！</h2>
    <section class="create-introduce">
      <Upload
        v-for="(item,index) in backData.steps"
        :key="item.id"
        v-model="backData.steps[index]"
        :n="index+1"
        @remove="removeStep"
      ></Upload>
      <el-button
        class="eaeaea add-step-button"
        type="primary"
        size="medium"
        icon="el-icon-plus"
        @click="addStep"
      >增加一步</el-button>
      <h5>烹饪小技巧</h5>
      <el-input
        class="introduce-text"
        type="textarea"
        :rows="8"
        placeholder="分享下你做这道菜的过程中的心得和小技巧吧！"
        v-model="backData.skill"
      ></el-input>
    </section>

    <el-button class="send" type="primary" size="medium" :icon="icon" @click="send">搞定，提交审核</el-button>
  </div>
</template>
<script>
import Stuff from "./stuff";
import Upload from "./step-upload";
import UploadImg from "@/components/upload-img";
import { getProperty, getClassify ,publish} from "@/service/api";

const staticData={
  "title":"title123",
  "property":{"craft":"1-1","flavor":"2-1","hard":"3-1","people":"4-1"},
  "classify":"1-1",
  "product_pic_url":"http://127.0.0.1:7001\\static\\upload\\product\\1591577371694653.jpg",
  "product_story":"1223",
  "raw_material":{"main_material":[{"name":"123","specs":"12"}],
  "accessories_material":[{"name":"12231","specs":"12"}]},
  "steps":[{"img_url":"http://127.0.0.1:7001\\static\\upload\\step\\5551577371715238.jpg","describe":"123"}],
  "skill":"123"
  }
const material = { name: "", specs: "" }; //主料辅料
const step = { img_url: "", describe: "" }; //步骤
let n = 1;
export default {
  name: "create",
  components: { Stuff, Upload, UploadImg },
  data() {
    return {
      icon: "",
      mockData: {
        properties: {},
        classifies: {}
      },
      backData: {
        title: "", //标题
        property: {}, //属性，获取前端页面时填充
        classify: "", //菜谱分类
        product_pic_url:"https://s1.c.meishij.net/n/images/upload_big_img.png?_=1561906961", //成品图
        product_story: "", //成品描述
        raw_material: {
          // 料 backData.raw_material.main_material
          main_material: Array(3).fill(1).map(() => ({ ...material })), // 主料
          accessories_material: Array(3).fill(1).map(() => ({ ...material })) // 辅料
        },
        steps: Array(3).fill(1).map(() => ({ ...step, id: this.createId() })),
        skill: ""
      }
    };
  },
  mounted() {
    getProperty().then(({ data }) => {
      this.mockData.properties = data;
      // console.log(res.data);
      this.backData.property = data.reduce((o, item) => {
        //获取到属性key值填充到property中
        o[item.title] = "";
        return o;
      }, {});
    });
    getClassify().then(({ data }) => {
      this.mockData.classifies = data;
    });
  },
  methods: {
    createId() {//给步骤添加唯一标识防止元素复用
      n++;
      return Date.now() + n;
    },
    removeStep(index) {
      this.backData.steps.splice(index - 1, 1);
    },
    addStep() {
      this.backData.steps.push({ ...step, id: this.createId() });
    },
    send() {
      this.icon = "el-icon-loading";
      let param = this.backData;
      //数据验证
      //去除标识id
      param.steps=param.steps.map((item)=>{
        return {
          img_url:item.img_url,
          describe:item.describe
        }
      });
      param=staticData;//测试数据
      publish(param).then(res=>{
        if(res.code===0){
          this.$router.push({name:'space'})
        }
      })
    }
  }
};
</script>
<style lang="stylus">
.create-introduce {
  background-color: #fff;
  padding: 20px;

  .add-step-button {
    margin-left: 100px;
  }
}

.create {
  width: 100%;

  h2 {
    text-align: center;
    margin: 20px 0;
  }

  .send {
    // ff3232()
    height: 70px;
    width: 220px;
    background: #ff3232;
    color: #fff;
    border: none;
    margin: 20px auto;
    display: block;
  }

  h5 {
    margin: 20px 0;
  }
}

.create-input input {
  width: 446px;
  line-height: 22px;
}

.upload-img-box {
  .upload-img {
    float: left;
  }

  .introduce-text {
    float: left;
  }

  .el-textarea {
    width: 60%;
    margin-left: 10px;
  }
}
</style>


