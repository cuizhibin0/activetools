<template>
  <section class="user-edit">
    <n3-form
      ref="form"
      validate
    >
      <n3-form-item
        label="支付方式名称"
        need
        :label-col="3"
      >
        <n3-input
          :rules="[{type:'required'}]"
          v-model="model.name"
          width="320px"
        >
        </n3-input>
      </n3-form-item>
      <n3-form-item
        label= "支付方式编码"
        need
        :label-col="3"
      >
        <n3-input
          v-model="model.mcc"
          width="320px"
          :rules="[{type:'required'}]"
          class="fl"
        >
      </n3-form-item>

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
import { mapState } from "vuex";
// import { randomPassword, dateFormat } from "../../utils";

export default {
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      model: {
        id: "",
        name: "",
        mcc: "",
        hightAmount: "",
        lowAmount: "",
        status: ""
      },
      loading: false,
      src: "",
      showStatus: 'false',
      
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
        shortName: "",
        bankCode: "",
        logo: ""
      };
      this.loading = false;
    },
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
          this.$router.push("/table/");
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
            this.showStatus = 'true';
            this.model.status = data.object.status;
            this.model.id = data.object.id;
            this.model.name = data.object.name;
            this.model.mcc = data.object.mcc;
            this.model.hightAmount = data.object.hightAmount;
            this.model.lowAmount = data.object.lowAmount;

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