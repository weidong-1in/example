<template>
  <div class="login-section">
    <!--rules表单验证规则-->
    <el-form
      label-position="top"
      :rules="rules"
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <!--把表单ref作为参数传入调用表单的validate方法-->
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/service/api";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid=> {
        if (valid) {
          //规程验证通过，发送用户名密码
          login({
            name: this.ruleForm.name,
            password: this.ruleForm.password
          }).then(res => {
            if (res.code === 0) {
              localStorage.setItem("token", res.data.token);
              
              window.location.href = "/";
            }
            if (res.code === 1) {
              this.$message.error(res.mes); //element中的错误提示方法message
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.login-section {
  padding: 0px 20px;
}
</style>