<template >
  <section class="user-edit">
    <n3-form
      ref="form"
      validate
    >
      <n3-form-item
        label="商户类别"
        need
        :label-col="3"
      >
        <n3-input
          :rules="[{type:'required'}]"
          v-model="model.name"
          width="320px"
        >
         <!-- :custom-validate="usernameValidate" -->
        </n3-input>
      </n3-form-item>
      <n3-form-item
        label= "mcc"
        need
        :label-col="3"
      >
        <n3-input
          v-model="model.mcc"
          width="320px"
          :rules="[{type:'required'}]"
          class="fl"
        >
        <!-- :custom-validate="passwordValidate" -->
        </n3-input>
        <!-- <div class="i-tips">
          <n3-tooltip content="随机生成" placement="top" trigger="hover">
            <n3-icon @click.native="randomPasswd" class="refresh" type="refresh"></n3-icon>
          </n3-tooltip>
        </div> -->
      </n3-form-item>
      <!-- <n3-form-item
        label="上限金额"
        need
        :label-col="3"
      >
        <n3-input
          :rules="[{type:'required'}]"
          v-model="model.hightAmount"
          width="320px"
          type="String"
        >
        </n3-input>
      </n3-form-item>
      <n3-form-item
        label="下限金额"
        need
        :label-col="3"
      >
        <n3-input
          :rules="[{type:'required'}]"
          v-model="model.lowAmount"
          width="320px"
          type="String"
        >
        </n3-input>
      </n3-form-item> -->
      <div v-if="showStatus">
        <n3-form-item
          label="状态"
          :label-col="3"
        >
        <!-- @change="searchChange" -->
          <n3-select v-model="model.status" >
              <n3-option value="">全部</n3-option>
              <n3-option value="1">可用</n3-option>
              <n3-option value="0">禁用</n3-option>
            </n3-select>
        </n3-form-item> 
      </div>



      <!-- 上传图片 -->
      <!-- <n3-form-item
        label="银行log"
        need
        :label-col="3"
      >
         <n3-button type="primary" @click.native="showCustomModal">
            <n3-icon type="plus-circle"></n3-icon>
               上传图片
            </n3-button>
        </n3-datepicker>

        <n3-modal  effect="zoom" width="400px" ref="customModal"  title="上传图片">
          <div slot="header">
            </div>
            <div slot="body" class="text-center">
              <n3-uploader type="drag" url="" @success="onSuccess" accept="image" name="file" ref="imgUpload" ></n3-uploader>
            </div>
            <div slot="footer">
            </div>
        </n3-modal>
        <!-- 图片回显 
        <br/>
        <img class="img" src="" ref="imgs"/>
        <n3-input
      </n3-form-item> -->
      <n3-form-item
        :label-col="3"
      >
        <n3-button
          @click.native="submit"
          type="primary"
          :loading="loading"
          class="submit-btn"
        >
          {{ loading ? '操作中' : '保存' }}
        </n3-button>
      </n3-form-item>
    </n3-form>
  </section>
</template>

<script>
import API from ".././../api/api.js";
import qs from "qs";
// import { mapState } from "vuex";
// import { randomPassword, dateFormat } from "../../utils";

export default {
  // computed: {
  //   ...mapState(["user"])
  // },
  data() {
    return {
      model: {
        id: "",
        name: "",
        mcc: "",
        // hightAmount: "",
        // lowAmount: "",
        status: ""
      },
      loading: false,
      src: "",
      showStatus: false,
      
    };
  },
  props: {
    mccId: ""
  },
  methods: {
    reload() {
      // 重置表单
      this.model = {
        name: "",
        mcc: "",
        status: ""
      };
      this.loading = false;
    },
    // showCustomModal() {
    //   this.$refs.imgUpload.url = API.IMG_UPLOAD;
    //   this.$refs.customModal.open();
    // },
    // Random Pass
    // randomPasswd() {
    //   this.model.password = randomPassword(18);
    // },
    addMcc() {
      let cond = Object.assign({}, this.model);
      // cond.expireDate = new Date(cond.expireDate).valueOf()
      this.loading = true;
      this.$http
        .post(API.ADD_MCC, qs.stringify(cond))
        .then(data => {
          this.loading = false;
          this.n3Alert({
            content: "保存成功~",
            type: "success",
            placement: "top-right",
            duration: 2000,
            width: "240px" // 内容不确定，建议设置width
          });

        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          this.n3Alert({
            content: "保存失败，请刷新重试~",
            type: "danger",
            placement: "top-right",
            duration: 2000,
            width: "240px" // 内容不确定，建议设置width
          });
        });
    },
    submit() {
      this.$refs.form.validateFields(result => {
        if (!result.isvalid) {
          return;
        }
        return this.addMcc();
      });
    },
    // 图片上传失败处理
    onError({ message, file }) {
      console.log(message);
      this.n3Alert({
        content: message.msg,
        type: "danger",
        placement: "top-right",
        duration: 2000,
        width: "200px" // 内容不确定，建议设置width
      });
    },
    // 图片上传成功处理
    onSuccess({ response, file }) {
      console.log(response);
      if (response.code === "0000") {
        this.model.logo = response.object.path;
        this.$refs.imgs.src = response.object.path;
      }
      // console.log(this.src);
    },
    findBankBYId() {
      console.log(this.showStatus);
      this.$http
        .post(
          API.FIND_MCC_BY_ID,
          qs.stringify({
            id: this.mccId
          })
        )
        .then(data => {
          // 成功处理
          if (data.code === "0000" && data.object != null) {
            this.showStatus = true;
            this.model.status = data.object.status;
            this.model.id = data.object.id;
            this.model.name = data.object.name;
            this.model.mcc = data.object.mcc;
            // this.model.hightAmount = data.object.hightAmount;
            // this.model.lowAmount = data.object.lowAmount;

            console.log(this.model.status)

          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          this.n3Alert({
            content: "查询失败",
            type: "danger",
            placement: "top-right",
            duration: 2000,
            width: "240px" // 内容不确定，建议设置width
          });
        });
    }
  },

  watch: {
    $route() {
      if (["normalForm"].indexOf(this.$route.name) > -1) {
        this.reload();
      }
    }
  },
  created: function() {
    this.findBankBYId();
  }
};
</script>

<style lang="less">
.user-edit {
  background: #fff;
  .submit-btn {
    width: 320px;
  }
  .refresh {
    cursor: pointer;
  }
  .i-tips {
    float: left;
    padding-left: 10px;
    color: #999;
  }
  .img {
    max-width: 200px;
    max-height: 100px;
  }
}
</style>